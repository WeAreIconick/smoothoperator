import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './editor.scss';
import './style.scss';

registerBlockType( 'autoscroll-block/autoscroll', {
	edit: ( { attributes, setAttributes } ) => {
		const { scrollSpeed, enableAnimations, animationStyle, animationThreshold, animationDuration, enableTypingEffect, typingSpeed, enableParallax, parallaxIntensity, enableParticles, particleDensity, enableGradientShift, gradientColors, enableBlurTransitions, blurIntensity, enableScaleEffects, scaleIntensity, enableGlitch, glitchFrequency, enableProgressBar, enableRipples, enableLightRays, enableAnimatedBg, particleTrails } = attributes;
		const blockProps = useBlockProps( {
			className: 'autoscroll-block-editor',
		} );

		const animationOptions = [
			{ label: __( 'Fade Up', 'autoscroll-block' ), value: 'fade-up' },
			{ label: __( 'Scale Up', 'autoscroll-block' ), value: 'scale' },
			{ label: __( 'Slide Left', 'autoscroll-block' ), value: 'slide-left' },
			{ label: __( 'Slide Right', 'autoscroll-block' ), value: 'slide-right' },
			{ label: __( 'Blur to Focus', 'autoscroll-block' ), value: 'blur' },
			{ label: __( 'Rotate', 'autoscroll-block' ), value: 'rotate' },
			{ label: __( 'Staggered', 'autoscroll-block' ), value: 'stagger' },
		];

		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Scroll Settings', 'autoscroll-block' ) } initialOpen={ true }>
						<RangeControl
							label={ __( 'Scroll Speed (pixels per second)', 'autoscroll-block' ) }
							value={ scrollSpeed }
							onChange={ ( value ) => setAttributes( { scrollSpeed: value } ) }
							min={ 10 }
							max={ 500 }
							step={ 10 }
							help={ __( 'How fast the page scrolls continuously from top to bottom', 'autoscroll-block' ) }
						/>
					</PanelBody>
					<PanelBody title={ __( 'Typing Effect', 'autoscroll-block' ) } initialOpen={ false }>
						<ToggleControl
							label={ __( 'Enable Typing Effect on Headings', 'autoscroll-block' ) }
							checked={ enableTypingEffect }
							onChange={ ( value ) => setAttributes( { enableTypingEffect: value } ) }
							help={ __( 'Animate headings with a typing effect as they scroll into view', 'autoscroll-block' ) }
						/>
						{ enableTypingEffect && (
							<RangeControl
								label={ __( 'Typing Speed (milliseconds per character)', 'autoscroll-block' ) }
								value={ typingSpeed }
								onChange={ ( value ) => setAttributes( { typingSpeed: value } ) }
								min={ 10 }
								max={ 200 }
								step={ 10 }
								help={ __( 'How fast each character appears (lower = faster)', 'autoscroll-block' ) }
							/>
						) }
					</PanelBody>
					<PanelBody title={ __( 'Animation Settings', 'autoscroll-block' ) } initialOpen={ false }>
						<ToggleControl
							label={ __( 'Enable Content Animations', 'autoscroll-block' ) }
							checked={ enableAnimations }
							onChange={ ( value ) => setAttributes( { enableAnimations: value } ) }
							help={ __( 'Animate content as it scrolls into view', 'autoscroll-block' ) }
						/>
						{ enableAnimations && (
							<>
								<SelectControl
									label={ __( 'Animation Style', 'autoscroll-block' ) }
									value={ animationStyle }
									options={ animationOptions }
									onChange={ ( value ) => setAttributes( { animationStyle: value } ) }
									help={ __( 'Choose how content animates when scrolling', 'autoscroll-block' ) }
								/>
								<RangeControl
									label={ __( 'Animation Threshold', 'autoscroll-block' ) }
									value={ animationThreshold }
									onChange={ ( value ) => setAttributes( { animationThreshold: value } ) }
									min={ 0 }
									max={ 1 }
									step={ 0.1 }
									help={ __( 'How much of the element must be visible before animating (0 = top edge, 1 = fully visible)', 'autoscroll-block' ) }
								/>
								<RangeControl
									label={ __( 'Animation Duration (seconds)', 'autoscroll-block' ) }
									value={ animationDuration }
									onChange={ ( value ) => setAttributes( { animationDuration: value } ) }
									min={ 0.1 }
									max={ 2 }
									step={ 0.1 }
									help={ __( 'How long the animation takes to complete', 'autoscroll-block' ) }
								/>
							</>
						) }
					</PanelBody>
					<PanelBody title={ __( 'Visual Effects', 'autoscroll-block' ) } initialOpen={ false }>
						<ToggleControl
							label={ __( 'Enable Parallax Scrolling', 'autoscroll-block' ) }
							checked={ enableParallax }
							onChange={ ( value ) => setAttributes( { enableParallax: value } ) }
							help={ __( 'Background elements move slower than foreground for depth effect', 'autoscroll-block' ) }
						/>
						{ enableParallax && (
							<RangeControl
								label={ __( 'Parallax Intensity', 'autoscroll-block' ) }
								value={ parallaxIntensity }
								onChange={ ( value ) => setAttributes( { parallaxIntensity: value } ) }
								min={ 0.1 }
								max={ 1 }
								step={ 0.1 }
								help={ __( 'How much slower background elements move (higher = more dramatic)', 'autoscroll-block' ) }
							/>
						) }
						<ToggleControl
							label={ __( 'Enable Particle Effects', 'autoscroll-block' ) }
							checked={ enableParticles }
							onChange={ ( value ) => setAttributes( { enableParticles: value } ) }
							help={ __( 'Add floating particles, sparkles, or confetti during scroll', 'autoscroll-block' ) }
						/>
						{ enableParticles && (
							<>
								<RangeControl
									label={ __( 'Particle Density', 'autoscroll-block' ) }
									value={ particleDensity }
									onChange={ ( value ) => setAttributes( { particleDensity: value } ) }
									min={ 10 }
									max={ 200 }
									step={ 10 }
									help={ __( 'Number of particles on screen (higher = more particles)', 'autoscroll-block' ) }
								/>
								<ToggleControl
									label={ __( 'Particle Trails', 'autoscroll-block' ) }
									checked={ particleTrails }
									onChange={ ( value ) => setAttributes( { particleTrails: value } ) }
									help={ __( 'Add trailing effects to particles for more visual impact', 'autoscroll-block' ) }
								/>
							</>
						) }
						<ToggleControl
							label={ __( 'Enable Gradient Shift', 'autoscroll-block' ) }
							checked={ enableGradientShift }
							onChange={ ( value ) => setAttributes( { enableGradientShift: value } ) }
							help={ __( 'Background color/gradient changes based on scroll position', 'autoscroll-block' ) }
						/>
						{ enableGradientShift && (
							<div style={ { marginTop: '10px' } }>
								<label style={ { display: 'block', marginBottom: '5px' } }>
									{ __( 'Gradient Colors (comma-separated hex colors)', 'autoscroll-block' ) }
								</label>
								<input
									type="text"
									value={ gradientColors }
									onChange={ ( e ) => setAttributes( { gradientColors: e.target.value } ) }
									placeholder="#667eea,#764ba2"
									style={ { width: '100%', padding: '5px' } }
								/>
							</div>
						) }
						<ToggleControl
							label={ __( 'Enable Blur Transitions', 'autoscroll-block' ) }
							checked={ enableBlurTransitions }
							onChange={ ( value ) => setAttributes( { enableBlurTransitions: value } ) }
							help={ __( 'Content blurs/unblurs as it enters/exits viewport', 'autoscroll-block' ) }
						/>
						{ enableBlurTransitions && (
							<RangeControl
								label={ __( 'Blur Intensity', 'autoscroll-block' ) }
								value={ blurIntensity }
								onChange={ ( value ) => setAttributes( { blurIntensity: value } ) }
								min={ 1 }
								max={ 20 }
								step={ 1 }
								help={ __( 'How much blur to apply (higher = more blur)', 'autoscroll-block' ) }
							/>
						) }
						<ToggleControl
							label={ __( 'Enable Scale Effects', 'autoscroll-block' ) }
							checked={ enableScaleEffects }
							onChange={ ( value ) => setAttributes( { enableScaleEffects: value } ) }
							help={ __( 'Elements zoom in/out as they scroll into view', 'autoscroll-block' ) }
						/>
						{ enableScaleEffects && (
							<RangeControl
								label={ __( 'Scale Intensity', 'autoscroll-block' ) }
								value={ scaleIntensity }
								onChange={ ( value ) => setAttributes( { scaleIntensity: value } ) }
								min={ 0.1 }
								max={ 0.5 }
								step={ 0.05 }
								help={ __( 'How much zoom effect (higher = more dramatic)', 'autoscroll-block' ) }
							/>
						) }
						<ToggleControl
							label={ __( 'Enable Glitch Effects', 'autoscroll-block' ) }
							checked={ enableGlitch }
							onChange={ ( value ) => setAttributes( { enableGlitch: value } ) }
							help={ __( 'Brief glitch/distortion when passing certain sections', 'autoscroll-block' ) }
						/>
						{ enableGlitch && (
							<RangeControl
								label={ __( 'Glitch Frequency', 'autoscroll-block' ) }
								value={ glitchFrequency }
								onChange={ ( value ) => setAttributes( { glitchFrequency: value } ) }
								min={ 0.01 }
								max={ 0.5 }
								step={ 0.01 }
								help={ __( 'How often glitch effects occur (higher = more frequent)', 'autoscroll-block' ) }
							/>
						) }
						<ToggleControl
							label={ __( 'Scroll Progress Bar', 'autoscroll-block' ) }
							checked={ enableProgressBar !== false }
							onChange={ ( value ) => setAttributes( { enableProgressBar: value } ) }
							help={ __( 'Show a progress bar at the top indicating scroll position', 'autoscroll-block' ) }
						/>
						<ToggleControl
							label={ __( 'Ripple Effects', 'autoscroll-block' ) }
							checked={ enableRipples }
							onChange={ ( value ) => setAttributes( { enableRipples: value } ) }
							help={ __( 'Add animated ripple effects during scrolling', 'autoscroll-block' ) }
						/>
						<ToggleControl
							label={ __( 'Light Rays', 'autoscroll-block' ) }
							checked={ enableLightRays }
							onChange={ ( value ) => setAttributes( { enableLightRays: value } ) }
							help={ __( 'Add animated light ray effects in the background', 'autoscroll-block' ) }
						/>
						<ToggleControl
							label={ __( 'Animated Background', 'autoscroll-block' ) }
							checked={ enableAnimatedBg }
							onChange={ ( value ) => setAttributes( { enableAnimatedBg: value } ) }
							help={ __( 'Add animated geometric patterns to the background', 'autoscroll-block' ) }
						/>
					</PanelBody>
				</InspectorControls>

				<div { ...blockProps }>
					<div className="autoscroll-block-preview">
						<div className="autoscroll-block-icon">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 4L8 8H11V16H13V8H16L12 4Z" fill="currentColor"/>
								<path d="M12 20L16 16H13V8H11V16H8L12 20Z" fill="currentColor"/>
							</svg>
						</div>
						<div className="autoscroll-block-info">
							<h3>{ __( 'Smooth Operator', 'autoscroll-block' ) }</h3>
							<p>
								{ __( 'Speed:', 'autoscroll-block' ) } { scrollSpeed }px/s
							</p>
							<p className="autoscroll-block-note">
								{ __( 'Use the play/pause button on the frontend to control continuous scrolling.', 'autoscroll-block' ) }
							</p>
						</div>
					</div>
				</div>
			</>
		);
	},

	save: ( { attributes } ) => {
		const { scrollSpeed, enableAnimations, animationStyle, animationThreshold, animationDuration, enableTypingEffect, typingSpeed, enableParallax, parallaxIntensity, enableParticles, particleDensity, enableGradientShift, gradientColors, enableBlurTransitions, blurIntensity, enableScaleEffects, scaleIntensity, enableGlitch, glitchFrequency, enableProgressBar, enableRipples, enableLightRays, enableAnimatedBg, particleTrails } = attributes;
		const blockProps = useBlockProps.save( {
			className: 'autoscroll-block',
			'data-scroll-speed': scrollSpeed,
			'data-enable-animations': enableAnimations ? 'true' : 'false',
			'data-animation-style': animationStyle,
			'data-animation-threshold': animationThreshold,
			'data-animation-duration': animationDuration,
			'data-enable-typing-effect': enableTypingEffect ? 'true' : 'false',
			'data-typing-speed': typingSpeed,
			'data-enable-parallax': enableParallax ? 'true' : 'false',
			'data-parallax-intensity': parallaxIntensity,
			'data-enable-particles': enableParticles ? 'true' : 'false',
			'data-particle-density': particleDensity,
			'data-enable-gradient-shift': enableGradientShift ? 'true' : 'false',
			'data-gradient-colors': gradientColors,
			'data-enable-blur-transitions': enableBlurTransitions ? 'true' : 'false',
			'data-blur-intensity': blurIntensity,
			'data-enable-scale-effects': enableScaleEffects ? 'true' : 'false',
			'data-scale-intensity': scaleIntensity,
			'data-enable-glitch': enableGlitch ? 'true' : 'false',
			'data-glitch-frequency': glitchFrequency,
			'data-enable-progress-bar': enableProgressBar !== false ? 'true' : 'false',
			'data-enable-ripples': enableRipples ? 'true' : 'false',
			'data-enable-light-rays': enableLightRays ? 'true' : 'false',
			'data-enable-animated-bg': enableAnimatedBg ? 'true' : 'false',
			'data-particle-trails': particleTrails ? 'true' : 'false',
		} );

		return (
			<div { ...blockProps }>
				<button 
					type="button"
					className="autoscroll-block-control" 
					aria-label={ __( 'Play/Pause smooth scroll', 'autoscroll-block' ) }
					aria-pressed="false"
				>
					<svg className="autoscroll-play-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
					</svg>
					<svg className="autoscroll-pause-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={ { display: 'none' } }>
						<path d="M6 4H10V20H6V4Z" fill="currentColor"/>
						<path d="M14 4H18V20H14V4Z" fill="currentColor"/>
					</svg>
				</button>
			</div>
		);
	},
} );

