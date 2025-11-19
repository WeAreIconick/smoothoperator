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
	register_block_type( $build_dir );
}
add_action( 'init', 'autoscroll_block_register_block' );

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
 * Enqueue frontend scripts and styles if block.json registration doesn't handle it
 */
function autoscroll_block_enqueue_assets() {
	// Only enqueue on frontend
	if ( is_admin() ) {
		return;
	}
	
	// Check if block is used on the page
	if ( ! has_block( 'autoscroll-block/autoscroll' ) ) {
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
			'1.0.0',
			true
		);
	}
	
	// Enqueue frontend styles if they exist
	if ( file_exists( $build_path . '/style-index.css' ) ) {
		wp_enqueue_style(
			'autoscroll-block-style',
			$base_url . 'style-index.css',
			array(),
			'1.0.1'
		);
	}
}
add_action( 'wp_enqueue_scripts', 'autoscroll_block_enqueue_assets' );
