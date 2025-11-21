<?php
/**
 * Plugin Name: Smooth Operator
 * Plugin URI: https://iconick.io
 * Description: Sit back and let your content do the scrolling. Perfect for demos, showcases, and making your site look like it has a mind of its own.
 * Version: 1.0.0
 * Author: iconick
 * Author URI: https://iconick.io
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: autoscroll-block
 * Requires at least: 5.8
 * Requires PHP: 7.4
 */

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the block
 */
function autoscroll_block_register_block() {
	// Check both build directory (development) and current directory (dist/production)
	$build_dir = __DIR__ . '/build';
	$dist_dir = __DIR__;
	$block_json_path = $build_dir . '/block.json';
	
	// If build directory doesn't exist, check current directory (for dist)
	if ( ! file_exists( $block_json_path ) ) {
		$block_json_path = $dist_dir . '/block.json';
		if ( file_exists( $block_json_path ) ) {
			$build_dir = $dist_dir;
		}
	}
	
	// Check if block.json exists
	if ( ! file_exists( $block_json_path ) ) {
		// Show admin notice
		if ( is_admin() && current_user_can( 'manage_options' ) ) {
			add_action( 'admin_notices', function() {
				echo '<div class="notice notice-error"><p><strong>Smooth Operator:</strong> Build files not found. Please run <code>npm run build</code> in the plugin directory.</p></div>';
			} );
		}
		return;
	}
	
	// Register block using block.json - WordPress will handle file: paths automatically
	// The register_block_type function expects the directory path containing block.json
	$result = register_block_type( $build_dir );
	
	// Debug: Log if registration failed (only in debug mode)
	if ( ! $result && defined( 'WP_DEBUG' ) && WP_DEBUG ) {
		error_log( 'Smooth Operator: Block registration failed. Block.json path: ' . $block_json_path );
		error_log( 'Smooth Operator: Build dir: ' . $build_dir );
		error_log( 'Smooth Operator: Block.json exists: ' . ( file_exists( $block_json_path ) ? 'yes' : 'no' ) );
	}
}
add_action( 'init', 'autoscroll_block_register_block', 20 ); // Priority 20 to ensure it runs after other plugins

/**
 * Ensure block is available for all post types (including Custom Post Types)
 * This filter ensures the block appears in the inserter for all post types
 */
function autoscroll_block_allowed_post_types( $allowed_block_types, $editor_context ) {
	// If this is a post editor context, ensure our block is always allowed
	if ( ! empty( $editor_context->post ) ) {
		// Get all registered block types
		$registered_blocks = \WP_Block_Type_Registry::get_instance()->get_all_registered();
		
		// If our block is registered, make sure it's in the allowed list
		if ( isset( $registered_blocks['autoscroll-block/autoscroll'] ) ) {
			// If $allowed_block_types is false, it means all blocks are allowed (default)
			// If it's an array, add our block if it's not already there
			if ( is_array( $allowed_block_types ) && ! in_array( 'autoscroll-block/autoscroll', $allowed_block_types, true ) ) {
				$allowed_block_types[] = 'autoscroll-block/autoscroll';
			}
			// If it's false, that's fine - all blocks are allowed
		}
	}
	
	return $allowed_block_types;
}
add_filter( 'allowed_block_types_all', 'autoscroll_block_allowed_post_types', 10, 2 );

/**
 * Add block category if it doesn't exist (for better organization)
 */
function autoscroll_block_add_category( $categories, $editor_context ) {
	if ( ! empty( $editor_context->post ) ) {
		// Check if widgets category exists, if not add it
		$category_exists = false;
		foreach ( $categories as $category ) {
			if ( 'widgets' === $category['slug'] ) {
				$category_exists = true;
				break;
			}
		}
		
		// Widgets category should exist by default, but ensure our block is there
		return $categories;
	}
	
	return $categories;
}
add_filter( 'block_categories_all', 'autoscroll_block_add_category', 10, 2 );

/**
 * Add admin notice if block.json is missing (for debugging)
 */
function autoscroll_block_admin_notice() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	
	// Check both locations
	$block_json_path = __DIR__ . '/build/block.json';
	if ( ! file_exists( $block_json_path ) ) {
		$block_json_path = __DIR__ . '/block.json';
	}
	
	if ( ! file_exists( $block_json_path ) ) {
		?>
		<div class="notice notice-warning">
			<p><strong>Smooth Operator:</strong> Block.json not found in build directory. Please run <code>npm run build</code> in the plugin directory.</p>
		</div>
		<?php
	}
}
add_action( 'admin_notices', 'autoscroll_block_admin_notice' );

/**
 * Debug function to check if block is registered (only shows in admin with WP_DEBUG)
 */
function autoscroll_block_debug_registration() {
	if ( defined( 'WP_DEBUG' ) && WP_DEBUG && is_admin() && current_user_can( 'manage_options' ) ) {
		$registry = \WP_Block_Type_Registry::get_instance();
		$is_registered = $registry->is_registered( 'autoscroll-block/autoscroll' );
		
		if ( ! $is_registered ) {
			add_action( 'admin_notices', function() {
				echo '<div class="notice notice-warning"><p><strong>Smooth Operator Debug:</strong> Block is NOT registered. Check that build files exist and block registration is working.</p></div>';
			} );
		}
	}
}
add_action( 'admin_init', 'autoscroll_block_debug_registration' );

/**
 * Enqueue frontend scripts and styles if block.json registration doesn't handle it
 */
function autoscroll_block_enqueue_assets() {
	// Only enqueue on frontend
	if ( is_admin() ) {
		return;
	}
	
	// Check if block is used on the page
	// Use multiple methods to detect the block for better compatibility
	$has_block = false;
	
	// Method 1: Check current post content
	if ( is_singular() ) {
		global $post;
		if ( $post && has_blocks( $post->post_content ) ) {
			$has_block = has_block( 'autoscroll-block/autoscroll', $post );
		}
	}
	
	// Method 2: Check if block exists in rendered content (for templates, CPTs, etc.)
	if ( ! $has_block ) {
		// Check all posts on archive pages
		if ( is_archive() || is_home() ) {
			global $wp_query;
			if ( $wp_query && $wp_query->posts ) {
				foreach ( $wp_query->posts as $post_item ) {
					if ( has_blocks( $post_item->post_content ) && has_block( 'autoscroll-block/autoscroll', $post_item ) ) {
						$has_block = true;
						break;
					}
				}
			}
		}
	}
	
	if ( ! $has_block ) {
		return;
	}
	
	// Check both build directory (development) and current directory (dist/production)
	$build_path = __DIR__ . '/build';
	$base_url = plugin_dir_url( __FILE__ );
	
	// If build directory doesn't exist, use current directory
	if ( ! file_exists( $build_path . '/view.js' ) ) {
		$build_path = __DIR__;
		$base_url = plugin_dir_url( __FILE__ );
	} else {
		$base_url = plugin_dir_url( __FILE__ ) . 'build/';
	}
	
	// Enqueue view script if it exists
	if ( file_exists( $build_path . '/view.js' ) ) {
		wp_enqueue_script(
			'autoscroll-block-view',
			$base_url . 'view.js',
			array(),
			filemtime( $build_path . '/view.js' ), // Use file modification time for cache busting
			true
		);
	}
	
	// Enqueue frontend styles if they exist
	if ( file_exists( $build_path . '/style-index.css' ) ) {
		wp_enqueue_style(
			'autoscroll-block-style',
			$base_url . 'style-index.css',
			array(),
			filemtime( $build_path . '/style-index.css' ) // Use file modification time for cache busting
		);
	}
}
add_action( 'wp_enqueue_scripts', 'autoscroll_block_enqueue_assets' );
