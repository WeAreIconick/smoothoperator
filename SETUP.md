# Setup Instructions

## Quick Start

1. **Install dependencies:**
   ```bash
   cd /Users/nick/Documents/github/autoscroll-block
   npm install
   ```

2. **Build the block:**
   ```bash
   npm run build
   ```
   
   Or build both dev and dist versions:
   ```bash
   npm run build:dist
   ```

3. **Copy to WordPress:**
   - Copy the entire `autoscroll-block` folder to your WordPress `wp-content/plugins/` directory
   - Or create a symlink for development:
     ```bash
     ln -s /Users/nick/Documents/github/autoscroll-block /path/to/wordpress/wp-content/plugins/autoscroll-block
     ```

4. **Activate the plugin** in WordPress admin under Plugins

5. **Add the block** to any post or page:
   - Click the "+" button in the editor
   - Search for "Smooth Operator" or look in the "Widgets" category
   - Add the block and configure settings in the sidebar

## Automatic Building (Recommended for Development)

To automatically rebuild both dev and dist versions whenever you make changes:

```bash
npm run watch:auto
```

This will:
- Watch for changes in `src/`, `block.json`, and `package.json`
- Automatically rebuild both `build/` and `dist/` directories
- Show build status and timestamps
- Press Ctrl+C to stop

For development with hot reload (editor only):
```bash
npm run watch
```

## Troubleshooting

### Block not showing up?

1. Make sure you've run `npm run build` - the block won't work without building first
2. Clear your browser cache and WordPress cache
3. Check that the plugin is activated in WordPress admin
4. Verify the `build/` directory exists and contains:
   - `block.json`
   - `index.js`
   - `view.js`
   - `style-index.css`
   - `index.css`

### Frontend controls not visible?

1. Make sure you've published/saved the post/page with the block
2. View the page on the frontend (not in the editor)
3. The play/pause button should appear in the bottom-right corner
4. Check browser console for JavaScript errors

### Development Mode

For development with auto-rebuild on file changes:
```bash
npm run start
```

This will watch for changes and rebuild automatically.

