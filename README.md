# Smooth Operator

Sit back and let your content do the scrolling. Perfect for demos, showcases, and making your site look like it has a mind of its own.

## Features

- Configurable scroll speed (pixels per second)
- Smooth continuous scrolling
- Play/pause controls on the frontend
- Automatically stops when reaching the bottom of the page
- Fixed position control button for easy access
- Responsive design for mobile devices
- Visual effects: parallax, particles, gradient shifts, blur transitions, scale effects, and glitch effects
- Content animations with multiple styles (fade-up, scale, slide, blur, rotate, staggered)
- Typing effect for headings

## Installation

1. Clone or download this repository to your WordPress plugins directory:
   ```
   wp-content/plugins/autoscroll-block/
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the block:
   ```bash
   npm run build
   ```

4. Activate the plugin through the WordPress admin panel.

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- WordPress 5.8 or higher

### Available Scripts

- `npm run build` - Build the block for production (outputs to `build/`)
- `npm run build:dist` - Build and copy to `dist/` folder (for distribution)
- `npm run watch` - Watch for changes and rebuild automatically (development mode)
- `npm run watch:auto` - Watch for changes and automatically build both dev and dist versions
- `npm run start` - Alias for `watch` - starts watch mode
- `npm run lint:js` - Lint JavaScript files
- `npm run lint:css` - Lint CSS/SCSS files
- `npm run format` - Format code using WordPress coding standards

### Automatic Building

To automatically build both dev and dist versions on file changes:

```bash
npm run watch:auto
```

This will:
- Watch for changes in `src/`, `block.json`, and `package.json`
- Automatically rebuild both `build/` and `dist/` directories
- Debounce builds to avoid excessive rebuilds

### Project Structure

```
autoscroll-block/
├── autoscroll-block.php    # Main plugin file
├── block.json              # Block metadata
├── package.json            # NPM dependencies
├── src/
│   ├── index.js           # Block registration and editor component
│   ├── view.js            # Frontend autoscroll functionality
│   ├── style.scss         # Frontend styles
│   └── editor.scss        # Editor styles
└── build/                 # Compiled files (generated)
```

## Usage

1. Add the Smooth Operator block to any post or page
2. Configure the scroll speed and visual effects in the block settings panel
3. Publish or preview your page
4. Click the play button on the frontend to start scrolling
5. Click pause to stop scrolling

## Recommended Settings for TikTok Videos

For smooth TikTok videos, try:
- Scroll Speed: 50-100 pixels per second
- Enable visual effects for more engaging content

Adjust based on your content length and desired video duration.

## License

GPL v2 or later

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

