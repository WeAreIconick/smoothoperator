# Troubleshooting Guide

## Block Not Showing Up

If the Smooth Operator block is not appearing in the WordPress block inserter, try these steps:

### 1. Verify Build Files Exist

Check that the build directory contains all necessary files:

```bash
cd /Users/nick/Documents/github/autoscroll-block
ls -la build/
```

You should see:
- `block.json` ✓
- `index.js` ✓
- `index.css` ✓
- `view.js` ✓
- `style-index.css` ✓
- `index.asset.php` ✓

If any are missing, run:
```bash
npm run build
```

### 2. Clear WordPress Cache

- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Clear WordPress cache if using a caching plugin
- Try a different browser or incognito mode

### 3. Check Plugin Activation

1. Go to WordPress Admin → Plugins
2. Verify "Smooth Operator" is activated
3. If not activated, click "Activate"

### 4. Check for JavaScript Errors

1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Look for any red error messages
4. Common issues:
   - Missing dependencies
   - File path errors
   - Block registration errors

### 5. Verify Block Registration

Add this to your `wp-config.php` temporarily to see debug info:

```php
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
```

Then check `/wp-content/debug.log` for any errors.

### 6. Check Block Category

The block should appear in the **Widgets** category in the block inserter. Try:
- Searching for "Smooth Operator" in the block inserter
- Looking in the Widgets category
- Using the "/" command and typing "smooth operator"

### 7. Rebuild the Block

Sometimes a clean rebuild helps:

```bash
cd /Users/nick/Documents/github/autoscroll-block
rm -rf build/
npm run build
```

Then refresh WordPress admin.

### 8. Check WordPress Version

The block requires WordPress 5.8 or higher. Verify your WordPress version:
- Go to Dashboard → Updates
- Or check the footer in WordPress admin

### 9. Check PHP Version

The plugin requires PHP 7.4 or higher. Check in:
- WordPress Admin → Tools → Site Health → Info → Server

### 10. Manual Block Registration Test

If block.json registration isn't working, the plugin has a fallback manual registration. Check that:
- `build/index.js` exists and is readable
- `build/index.asset.php` exists and contains valid PHP

### Still Not Working?

1. Check WordPress error logs: `/wp-content/debug.log`
2. Check browser console for JavaScript errors
3. Verify file permissions on the plugin directory
4. Try deactivating other plugins to check for conflicts
5. Switch to a default theme temporarily to rule out theme conflicts

