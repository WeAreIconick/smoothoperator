# Quick Test Checklist

If the block still isn't showing up, verify these steps:

## 1. Verify Build Files
```bash
cd /Users/nick/Documents/github/autoscroll-block
ls -la build/
```

Should show:
- ✓ block.json
- ✓ index.js  
- ✓ index.css
- ✓ view.js
- ✓ style-index.css
- ✓ index.asset.php

## 2. Check WordPress Plugin Activation
- Go to WordPress Admin → Plugins
- Verify "Smooth Operator" is **activated** (not just installed)
- If not activated, click "Activate"

## 3. Clear All Caches
- Browser cache: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
- WordPress cache: Clear any caching plugins
- Try incognito/private browsing mode

## 4. Check Browser Console
1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Look for any red errors
4. Common errors to check:
   - 404 errors for build/index.js
   - JavaScript errors
   - Block registration errors

## 5. Verify Block Registration
Add this temporary code to test if the block is being registered:

In WordPress, go to Appearance → Theme Editor → functions.php (or use a plugin like Code Snippets) and add:

```php
add_action('admin_footer', function() {
    if (function_exists('wp_get_registered_blocks')) {
        $blocks = wp_get_registered_blocks();
        echo '<script>console.log("Registered blocks:", ' . json_encode(array_keys($blocks)) . ');</script>';
    }
});
```

Then check browser console to see if "autoscroll-block/autoscroll" appears in the list.

## 6. Check File Permissions
```bash
cd /Users/nick/Documents/github/autoscroll-block
ls -la build/
```

Files should be readable (not 000 permissions).

## 7. Test Block.json Paths
The block.json uses `file:./` paths. WordPress should resolve these automatically when you pass the directory to `register_block_type()`.

## 8. Manual Registration Test
If block.json registration isn't working, the plugin has fallback code, but you can also test manual registration by temporarily modifying `autoscroll-block.php` to use the manual registration method.

## Still Not Working?

Check WordPress debug log:
1. Enable WP_DEBUG in wp-config.php
2. Check `/wp-content/debug.log` for errors
3. Look for "Smooth Operator" related errors

