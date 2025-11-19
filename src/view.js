( function() {
	'use strict';

	/**
	 * Initialize autoscroll functionality for all autoscroll blocks on the page
	 */
	function initAutoscrollBlocks() {
		const blocks = document.querySelectorAll( '.autoscroll-block' );

		blocks.forEach( ( block ) => {
			// Skip if already initialized
			if ( block.dataset.autoscrollInitialized === 'true' ) {
				return;
			}

			// Parse scroll speed (pixels per second)
			const scrollSpeed = parseFloat( block.dataset.scrollSpeed ) || 50;
			
			// Parse animation settings
			const enableAnimations = block.dataset.enableAnimations !== 'false';
			const animationStyle = block.dataset.animationStyle || 'fade-up';
			const animationThreshold = parseFloat( block.dataset.animationThreshold ) || 0.1;
			const animationDuration = parseFloat( block.dataset.animationDuration ) || 0.6;
			
			// Parse typing effect settings
			const enableTypingEffect = block.dataset.enableTypingEffect === 'true';
			const typingSpeed = parseFloat( block.dataset.typingSpeed ) || 50;
			
			// Parse visual effect settings
			const enableParallax = block.dataset.enableParallax === 'true';
			const parallaxIntensity = parseFloat( block.dataset.parallaxIntensity ) || 0.5;
			const enableParticles = block.dataset.enableParticles === 'true';
			const particleDensity = parseFloat( block.dataset.particleDensity ) || 50;
			const enableGradientShift = block.dataset.enableGradientShift === 'true';
			const gradientColors = ( block.dataset.gradientColors || '#667eea,#764ba2' ).split( ',' );
			const enableBlurTransitions = block.dataset.enableBlurTransitions === 'true';
			const blurIntensity = parseFloat( block.dataset.blurIntensity ) || 5;
			const enableScaleEffects = block.dataset.enableScaleEffects === 'true';
			const scaleIntensity = parseFloat( block.dataset.scaleIntensity ) || 0.1;
			const enableGlitch = block.dataset.enableGlitch === 'true';
			const glitchFrequency = parseFloat( block.dataset.glitchFrequency ) || 0.1;
			const enableProgressBar = block.dataset.enableProgressBar !== 'false';
			const enableRipples = block.dataset.enableRipples === 'true';
			const enableLightRays = block.dataset.enableLightRays === 'true';
			const enableAnimatedBg = block.dataset.enableAnimatedBg === 'true';
			const particleTrails = block.dataset.particleTrails === 'true';
			
			const controlButton = block.querySelector( '.autoscroll-block-control' );

			if ( ! controlButton ) {
				return;
			}

			let animationFrame = null;
			let isPlaying = false;

			// Get icon elements
			const playIcon = controlButton.querySelector( '.autoscroll-play-icon' );
			const pauseIcon = controlButton.querySelector( '.autoscroll-pause-icon' );

			/**
			 * Check if we've reached the bottom of the page
			 */
			function isAtBottom() {
				const windowHeight = window.innerHeight;
				const scrollY = window.scrollY || window.pageYOffset;
				const documentHeight = Math.max(
					document.body.scrollHeight,
					document.body.offsetHeight,
					document.documentElement.clientHeight,
					document.documentElement.scrollHeight,
					document.documentElement.offsetHeight
				);

				// Check if we're within 1 pixel of the bottom
				return windowHeight + scrollY >= documentHeight - 1;
			}

			/**
			 * Continuous smooth scrolling animation
			 */
			function continuousScroll() {
				if ( ! isPlaying ) {
					return;
				}

				// Check if we've reached the bottom
				if ( isAtBottom() ) {
					stopScroll();
					return;
				}


				// Get current scroll position
				const currentScrollY = window.scrollY || window.pageYOffset;
				
				// Calculate scroll increment based on speed and frame time
				// Use a consistent frame-based approach instead of elapsed time
				const frameTime = 16.67; // ~60fps in milliseconds
				const scrollIncrement = ( scrollSpeed * frameTime ) / 1000; // pixels per frame
				const newScrollY = currentScrollY + scrollIncrement;

				// Get maximum scroll position (recalculate each frame in case page height changes)
				const documentHeight = Math.max(
					document.body.scrollHeight,
					document.body.offsetHeight,
					document.documentElement.clientHeight,
					document.documentElement.scrollHeight,
					document.documentElement.offsetHeight
				);
				const maxScrollY = Math.max( 0, documentHeight - window.innerHeight );

				// Scroll to the calculated position (don't exceed max)
				const targetScrollY = Math.min( newScrollY, maxScrollY );
				window.scrollTo( 0, targetScrollY );

				// Update progress bar if enabled
				if ( enableProgressBar ) {
					updateProgressBar( targetScrollY, maxScrollY );
				}

				// Trigger ripple effects if enabled
				if ( enableRipples && Math.random() < 0.02 ) {
					createRipple( window.innerWidth / 2, window.innerHeight / 2 );
				}

				// Continue scrolling
				animationFrame = requestAnimationFrame( continuousScroll );
			}

			/**
			 * Initialize typing effect for headings
			 */
			function initTypingEffect() {
				if ( ! enableTypingEffect ) {
					return;
				}

				// Find all headings
				const headings = document.querySelectorAll( 'h1, h2, h3, h4, h5, h6' );

				if ( headings.length === 0 ) {
					return;
				}

				// Store original text and hide headings initially
				headings.forEach( function( heading ) {
					// Store original text
					if ( ! heading.dataset.originalText ) {
						heading.dataset.originalText = heading.textContent.trim();
					}
					// Hide heading completely
					heading.textContent = '';
					heading.style.opacity = '0';
					heading.style.visibility = 'hidden';
				} );

				// Create Intersection Observer for typing effect
				// Trigger when heading enters viewport
				const typingObserver = new IntersectionObserver( function( entries ) {
					entries.forEach( function( entry ) {
						if ( entry.isIntersecting && ! entry.target.dataset.typingStarted ) {
							entry.target.dataset.typingStarted = 'true';
							startTypingEffect( entry.target );
						}
					} );
				}, {
					root: null,
					rootMargin: '0px',
					threshold: 0.3 // Trigger when 30% of heading is visible
				} );

				// Observe all headings
				headings.forEach( function( heading ) {
					typingObserver.observe( heading );
				} );
			}

			/**
			 * Start typing effect on a heading
			 */
			function startTypingEffect( heading ) {
				const originalText = heading.dataset.originalText;
				if ( ! originalText ) {
					return;
				}

				const textLength = originalText.length;
				let currentIndex = 0;

				// Make heading visible but keep it hidden during typing
				heading.style.visibility = 'visible';
				heading.style.opacity = '0';
				heading.textContent = '';
				
				// Type each character
				function typeNextChar() {
					if ( currentIndex < textLength ) {
						heading.textContent = originalText.substring( 0, currentIndex + 1 );
						currentIndex++;
						setTimeout( typeNextChar, typingSpeed );
					} else {
						// Typing complete - show the heading
						heading.style.opacity = '1';
						heading.style.transition = 'opacity 0.3s ease-in';
					}
				}

				// Start typing
				typeNextChar();
			}

			/**
			 * Initialize scroll-triggered animations
			 */
			function initScrollAnimations() {
				if ( ! enableAnimations ) {
					return;
				}

				// Check if Intersection Observer is supported
				if ( ! window.IntersectionObserver ) {
					return;
				}

				// Map animation style to CSS class
				const animationClassMap = {
					'fade-up': 'autoscroll-animate-fade-up',
					'scale': 'autoscroll-animate-scale',
					'slide-left': 'autoscroll-animate-slide-left',
					'slide-right': 'autoscroll-animate-slide-right',
					'blur': 'autoscroll-animate-blur',
					'rotate': 'autoscroll-animate-rotate',
					'stagger': 'autoscroll-animate-stagger'
				};

				const animationClass = animationClassMap[ animationStyle ] || 'autoscroll-animate-fade-up';

				// Find elements that should be animated (content blocks)
				// Target common content elements: headings, paragraphs, images, blocks
				const contentSelectors = [
					'article h1, article h2, article h3, article h4, article h5, article h6',
					'article p',
					'article img',
					'article .wp-block-group',
					'article .wp-block-columns',
					'article .wp-block-image',
					'article .wp-block-heading',
					'article .wp-block-paragraph',
					'article .wp-block-list',
					'article .wp-block-quote',
					'.wp-block-group > *',
					'.wp-block-columns > *',
					'.entry-content > *',
					'.post-content > *',
					'.content > *'
				].join( ', ' );

				// Also check for manually added animation classes
				const manualAnimatedElements = document.querySelectorAll( 
					'.autoscroll-animate-fade-up, ' +
					'.autoscroll-animate-scale, ' +
					'.autoscroll-animate-slide-left, ' +
					'.autoscroll-animate-slide-right, ' +
					'.autoscroll-animate-blur, ' +
					'.autoscroll-animate-rotate, ' +
					'.autoscroll-animate-stagger'
				);

				// Get content elements and apply animation class
				const contentElements = document.querySelectorAll( contentSelectors );
				const elementsToAnimate = [];

				// Add content elements with the configured animation class
				contentElements.forEach( function( element ) {
					// Skip if already has an animation class or is the autoscroll block itself
					if ( ! element.closest( '.autoscroll-block' ) && 
						 ! element.classList.contains( 'autoscroll-animate-' ) &&
						 ! element.matches( '.autoscroll-block-control, .autoscroll-block-control *' ) ) {
						element.classList.add( animationClass );
						elementsToAnimate.push( element );
					}
				} );

				// Add manually animated elements
				manualAnimatedElements.forEach( function( element ) {
					if ( ! elementsToAnimate.includes( element ) ) {
						elementsToAnimate.push( element );
					}
				} );

				if ( elementsToAnimate.length === 0 ) {
					return;
				}

				// Set custom animation duration via CSS variable
				document.documentElement.style.setProperty( '--autoscroll-animation-duration', animationDuration + 's' );

				// Create Intersection Observer
				const observer = new IntersectionObserver( function( entries ) {
					entries.forEach( function( entry ) {
						if ( entry.isIntersecting ) {
							entry.target.classList.add( 'is-visible' );
						}
					} );
				}, {
					root: null,
					rootMargin: '0px',
					threshold: animationThreshold
				} );

				// Observe all animated elements
				elementsToAnimate.forEach( function( element ) {
					observer.observe( element );
				} );
			}

			/**
			 * Initialize parallax scrolling effect
			 */
			function initParallax() {
				if ( ! enableParallax ) {
					return;
				}

				document.body.classList.add( 'autoscroll-parallax' );

				// Find elements with background images or backgrounds
				const parallaxElements = document.querySelectorAll( 'img, .wp-block-image, .wp-block-cover, [style*="background-image"]' );

				parallaxElements.forEach( function( element ) {
					element.classList.add( 'autoscroll-parallax-layer' );
				} );

				// Update parallax on scroll
				function updateParallax() {
					if ( ! isPlaying ) {
						return;
					}

					const scrollY = window.scrollY || window.pageYOffset;
					const parallaxOffset = scrollY * parallaxIntensity;

					parallaxElements.forEach( function( element ) {
						element.style.transform = 'translateY(' + parallaxOffset + 'px)';
					} );

					requestAnimationFrame( updateParallax );
				}

				if ( isPlaying ) {
					updateParallax();
				}
			}

			/**
			 * Initialize particle effects
			 */
			let particleInterval = null;
			function initParticles() {
				if ( ! enableParticles ) {
					return;
				}

				// Create particles container if it doesn't exist
				let particlesContainer = document.querySelector( '.autoscroll-particles-container' );
				if ( ! particlesContainer ) {
					particlesContainer = document.createElement( 'div' );
					particlesContainer.className = 'autoscroll-particles-container';
					document.body.appendChild( particlesContainer );
				}

				// Create particles
				function createParticle() {
					const particle = document.createElement( 'div' );
					particle.className = 'autoscroll-particle';

					const size = Math.random() * 8 + 4; // 4-12px (larger particles)
					const x = Math.random() * window.innerWidth;
					const delay = Math.random() * 2;
					const duration = Math.random() * 5 + 5; // 5-10 seconds
					const xOffset = ( Math.random() - 0.5 ) * 40; // -20px to 20px horizontal drift
					
					// Add some color variety - mix of white, light blue, light pink, light yellow
					const colors = [
						'rgba(255, 255, 255, 1)',
						'rgba(173, 216, 230, 1)',
						'rgba(255, 182, 193, 1)',
						'rgba(255, 255, 224, 1)',
						'rgba(221, 160, 221, 1)'
					];
					const color = colors[ Math.floor( Math.random() * colors.length ) ];

					particle.style.width = size + 'px';
					particle.style.height = size + 'px';
					particle.style.left = x + 'px';
					particle.style.top = window.innerHeight + 'px';
					particle.style.background = color;
					particle.style.boxShadow = '0 0 ' + ( size * 2 ) + 'px ' + color + ', 0 0 ' + ( size * 1.5 ) + 'px rgba(255, 255, 255, 0.8)';
					particle.style.animation = 'particleFloat ' + duration + 's ' + delay + 's ease-in-out forwards';
					particle.style.setProperty( '--particle-x-offset', xOffset );
					
					// Add trail effect if enabled
					if ( particleTrails ) {
						particle.classList.add( 'autoscroll-particle-trail' );
					}

					particlesContainer.appendChild( particle );

					// Remove particle after animation completes
					setTimeout( function() {
						if ( particle.parentNode ) {
							particle.parentNode.removeChild( particle );
						}
					}, ( delay + duration ) * 1000 + 100 );
				}

				// Create initial particles
				for ( let i = 0; i < particleDensity; i++ ) {
					setTimeout( createParticle, i * 100 );
				}

				// Continuously create new particles (not dependent on isPlaying)
				if ( particleInterval ) {
					clearInterval( particleInterval );
				}
				particleInterval = setInterval( function() {
					if ( particlesContainer.children.length < particleDensity ) {
						createParticle();
					}
				}, 2000 );
			}

			/**
			 * Initialize gradient shift background
			 */
			function initGradientShift() {
				if ( ! enableGradientShift ) {
					return;
				}

				document.body.classList.add( 'autoscroll-gradient-shift' );

				// Set initial gradient colors
				if ( gradientColors.length >= 2 ) {
					document.documentElement.style.setProperty( '--gradient-color-1', gradientColors[0].trim() );
					document.documentElement.style.setProperty( '--gradient-color-2', gradientColors[1].trim() );
				}

				// Update gradient based on scroll position
				function updateGradient() {
					if ( ! isPlaying ) {
						return;
					}

					const scrollY = window.scrollY || window.pageYOffset;
					const documentHeight = Math.max(
						document.body.scrollHeight,
						document.body.offsetHeight,
						document.documentElement.clientHeight,
						document.documentElement.scrollHeight,
						document.documentElement.offsetHeight
					);
					const scrollProgress = Math.min( scrollY / documentHeight, 1 );

					// Interpolate between colors based on scroll progress
					if ( gradientColors.length >= 2 ) {
						const color1 = gradientColors[0].trim();
						const color2 = gradientColors[1].trim();
						const color3 = gradientColors[2] ? gradientColors[2].trim() : color2;

						// Use different colors at different scroll positions
						let currentColor1, currentColor2;
						if ( scrollProgress < 0.5 ) {
							currentColor1 = color1;
							currentColor2 = color2;
						} else {
							currentColor1 = color2;
							currentColor2 = color3;
						}

						document.documentElement.style.setProperty( '--gradient-color-1', currentColor1 );
						document.documentElement.style.setProperty( '--gradient-color-2', currentColor2 );
					}

					requestAnimationFrame( updateGradient );
				}

				if ( isPlaying ) {
					updateGradient();
				}
			}

			/**
			 * Initialize blur transitions
			 */
			function initBlurTransitions() {
				if ( ! enableBlurTransitions ) {
					return;
				}

				document.body.classList.add( 'autoscroll-blur-transitions' );

				// Find content elements
				const contentElements = document.querySelectorAll( 'p, h1, h2, h3, h4, h5, h6, img, .wp-block-group, .wp-block-columns' );

				contentElements.forEach( function( element ) {
					element.classList.add( 'autoscroll-blur-element' );
				} );

				// Create Intersection Observer for blur effect
				const blurObserver = new IntersectionObserver( function( entries ) {
					entries.forEach( function( entry ) {
						if ( entry.isIntersecting ) {
							const progress = entry.intersectionRatio;
							const blurAmount = blurIntensity * ( 1 - progress );
							entry.target.style.filter = 'blur(' + blurAmount + 'px)';
						} else {
							entry.target.style.filter = 'blur(' + blurIntensity + 'px)';
						}
					} );
				}, {
					root: null,
					rootMargin: '0px',
					threshold: [ 0, 0.25, 0.5, 0.75, 1 ]
				} );

				contentElements.forEach( function( element ) {
					blurObserver.observe( element );
				} );
			}

			/**
			 * Initialize scale effects
			 */
			function initScaleEffects() {
				if ( ! enableScaleEffects ) {
					return;
				}

				document.body.classList.add( 'autoscroll-scale-effects' );

				// Find content elements
				const contentElements = document.querySelectorAll( 'p, h1, h2, h3, h4, h5, h6, img, .wp-block-group, .wp-block-columns, .wp-block-image' );

				contentElements.forEach( function( element ) {
					element.classList.add( 'autoscroll-scale-element' );
				} );

				// Create Intersection Observer for scale effect
				const scaleObserver = new IntersectionObserver( function( entries ) {
					entries.forEach( function( entry ) {
						if ( entry.isIntersecting ) {
							const progress = entry.intersectionRatio;
							const scale = 1 - scaleIntensity + ( scaleIntensity * progress );
							entry.target.style.transform = 'scale(' + scale + ')';
						} else {
							entry.target.style.transform = 'scale(' + ( 1 - scaleIntensity ) + ')';
						}
					} );
				}, {
					root: null,
					rootMargin: '0px',
					threshold: [ 0, 0.25, 0.5, 0.75, 1 ]
				} );

				contentElements.forEach( function( element ) {
					scaleObserver.observe( element );
				} );
			}

			/**
			 * Update progress bar
			 */
			function updateProgressBar( currentScroll, maxScroll ) {
				let progressBar = document.querySelector( '.autoscroll-progress-bar' );
				if ( ! progressBar ) {
					progressBar = document.createElement( 'div' );
					progressBar.className = 'autoscroll-progress-bar';
					document.body.appendChild( progressBar );
				}
				const progress = maxScroll > 0 ? ( currentScroll / maxScroll ) * 100 : 0;
				progressBar.style.width = progress + '%';
			}

			/**
			 * Create ripple effect
			 */
			function createRipple( x, y ) {
				const ripple = document.createElement( 'div' );
				ripple.className = 'autoscroll-ripple';
				ripple.style.left = x + 'px';
				ripple.style.top = y + 'px';
				document.body.appendChild( ripple );

				setTimeout( function() {
					if ( ripple.parentNode ) {
						ripple.parentNode.removeChild( ripple );
					}
				}, 2000 );
			}

			/**
			 * Initialize light rays effect
			 */
			function initLightRays() {
				if ( ! enableLightRays ) {
					return;
				}

				let raysContainer = document.querySelector( '.autoscroll-light-rays' );
				if ( ! raysContainer ) {
					raysContainer = document.createElement( 'div' );
					raysContainer.className = 'autoscroll-light-rays';
					document.body.appendChild( raysContainer );

					// Create multiple light rays
					for ( let i = 0; i < 5; i++ ) {
						const ray = document.createElement( 'div' );
						ray.className = 'autoscroll-light-ray';
						ray.style.setProperty( '--ray-delay', i * 0.5 + 's' );
						ray.style.setProperty( '--ray-duration', ( Math.random() * 3 + 4 ) + 's' );
						raysContainer.appendChild( ray );
					}
				}
			}

			/**
			 * Initialize animated background patterns
			 */
			function initAnimatedBg() {
				if ( ! enableAnimatedBg ) {
					return;
				}

				document.body.classList.add( 'autoscroll-animated-bg' );
			}

			/**
			 * Initialize glitch effects
			 */
			function initGlitch() {
				if ( ! enableGlitch ) {
					return;
				}

				document.body.classList.add( 'autoscroll-glitch' );

				// Random glitch effect
				function triggerGlitch() {
					if ( ! isPlaying ) {
						return;
					}

					if ( Math.random() < glitchFrequency ) {
						document.body.classList.add( 'glitch-active' );
						setTimeout( function() {
							document.body.classList.remove( 'glitch-active' );
						}, 300 );
					}

					setTimeout( triggerGlitch, 1000 );
				}

				if ( isPlaying ) {
					triggerGlitch();
				}
			}

			/**
			 * Start autoscrolling
			 */
			function startScroll() {
				if ( isPlaying ) {
					return;
				}

				isPlaying = true;
				controlButton.setAttribute( 'aria-pressed', 'true' );
				controlButton.classList.add( 'is-playing' );

				// Add class to body to enable animations
				document.body.classList.add( 'autoscroll-active' );

				// Initialize scroll animations
				initScrollAnimations();

				// Initialize typing effect (if enabled)
				if ( enableTypingEffect ) {
					initTypingEffect();
				}

				// Initialize visual effects
				if ( enableParallax ) {
					initParallax();
				}
				if ( enableParticles ) {
					initParticles();
				}
				if ( enableGradientShift ) {
					initGradientShift();
				}
				if ( enableBlurTransitions ) {
					initBlurTransitions();
				}
				if ( enableScaleEffects ) {
					initScaleEffects();
				}
				if ( enableGlitch ) {
					initGlitch();
				}
				if ( enableLightRays ) {
					initLightRays();
				}
				if ( enableAnimatedBg ) {
					initAnimatedBg();
				}
				if ( enableProgressBar ) {
					updateProgressBar( window.scrollY || 0, Math.max( 0, document.documentElement.scrollHeight - window.innerHeight ) );
				}

				// Show pause icon, hide play icon
				if ( playIcon ) {
					playIcon.style.display = 'none';
				}
				if ( pauseIcon ) {
					pauseIcon.style.display = 'block';
				}

				// Initialize continuous scrolling
				// No need to store startTime/startScrollY - we'll use frame-based incremental scrolling
				animationFrame = requestAnimationFrame( continuousScroll );
			}

			/**
			 * Stop autoscrolling
			 */
			function stopScroll() {
				if ( animationFrame ) {
					cancelAnimationFrame( animationFrame );
					animationFrame = null;
				}

				isPlaying = false;
				controlButton.setAttribute( 'aria-pressed', 'false' );
				controlButton.classList.remove( 'is-playing', 'is-scrolling' );

				// Remove class from body (optional - you might want to keep animations active)
				// document.body.classList.remove( 'autoscroll-active' );

				// Show play icon, hide pause icon
				if ( playIcon ) {
					playIcon.style.display = 'block';
				}
				if ( pauseIcon ) {
					pauseIcon.style.display = 'none';
				}
			}

			/**
			 * Toggle play/pause
			 */
			function toggleScroll() {
				if ( isPlaying ) {
					stopScroll();
				} else {
					startScroll();
				}
			}

			// Add click handler
			controlButton.addEventListener( 'click', toggleScroll );

			// Stop scrolling when page is hidden (tab switch, etc.)
			document.addEventListener( 'visibilitychange', function() {
				if ( document.hidden && isPlaying ) {
					stopScroll();
				}
			} );

			// Clean up on page unload
			window.addEventListener( 'beforeunload', function() {
				if ( animationFrame ) {
					cancelAnimationFrame( animationFrame );
				}
			} );

			// Mark as initialized
			block.dataset.autoscrollInitialized = 'true';
		} );
	}

	/**
	 * Initialize scroll animations on page load
	 */
	function initPageAnimations() {
		// Check if Intersection Observer is supported
		if ( ! window.IntersectionObserver ) {
			return;
		}

		// Find all elements with animation classes
		const animatedElements = document.querySelectorAll( 
			'.autoscroll-animate-fade-up, ' +
			'.autoscroll-animate-scale, ' +
			'.autoscroll-animate-slide-left, ' +
			'.autoscroll-animate-slide-right, ' +
			'.autoscroll-animate-blur, ' +
			'.autoscroll-animate-rotate, ' +
			'.autoscroll-animate-stagger'
		);

		if ( animatedElements.length === 0 ) {
			return;
		}

		// Add autoscroll-active class to body if animations are present
		document.body.classList.add( 'autoscroll-active' );

		// Create Intersection Observer
		const observer = new IntersectionObserver( function( entries ) {
			entries.forEach( function( entry ) {
				if ( entry.isIntersecting ) {
					entry.target.classList.add( 'is-visible' );
				}
			} );
		}, {
			root: null,
			rootMargin: '0px',
			threshold: 0.1 // Trigger when 10% of element is visible
		} );

		// Observe all animated elements
		animatedElements.forEach( function( element ) {
			observer.observe( element );
		} );
	}

	/**
	 * Initialize typing effect on page load (if enabled)
	 */
	function initPageTypingEffect() {
		const blocks = document.querySelectorAll( '.autoscroll-block' );
		blocks.forEach( function( block ) {
			const enableTypingEffect = block.dataset.enableTypingEffect === 'true';
			if ( enableTypingEffect ) {
				// Find all headings
				const headings = document.querySelectorAll( 'h1, h2, h3, h4, h5, h6' );
				headings.forEach( function( heading ) {
					if ( ! heading.dataset.originalText ) {
						heading.dataset.originalText = heading.textContent;
					}
				} );
			}
		} );
	}

	// Initialize when DOM is ready
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', function() {
			initAutoscrollBlocks();
			initPageAnimations();
			initPageTypingEffect();
		} );
	} else {
		initAutoscrollBlocks();
		initPageAnimations();
		initPageTypingEffect();
	}

	// Re-initialize for dynamically loaded content (e.g., AJAX)
	if ( typeof jQuery !== 'undefined' ) {
		jQuery( document ).on( 'autoscroll-reinit', initAutoscrollBlocks );
	}
} )();

