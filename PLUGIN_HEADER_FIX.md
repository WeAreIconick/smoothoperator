# Plugin Header Error Fix

If you're getting the error "The plugin does not have a valid header", try these steps:

## 1. Verify File Location

The plugin file must be in the correct location:
```
wp-content/plugins/autoscroll-block/autoscroll-block.php
```

## 2. Check File Permissions

Make sure the file is readable:
```bash
chmod 644 autoscroll-block.php
```

## 3. Verify Header Format

The header must be exactly:
- Line 1: `<?php`
- Line 2: `/**` (comment start)
- Line 3: ` * Plugin Name: Smooth Operator`
- Followed by other header fields
- Ends with ` */`

## 4. Clear WordPress Cache

- Deactivate and reactivate the plugin
- Clear any caching plugins
- Clear browser cache

## 5. Check for PHP Errors

Enable WordPress debug mode in `wp-config.php`:
```php
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
```

Then check `/wp-content/debug.log` for errors.

## 6. Alternative: Rename Plugin File

Sometimes WordPress has issues with certain filenames. Try renaming:
- From: `autoscroll-block.php`
- To: `autoscroll-block-main.php`

Then update the directory name to match, or keep the same directory name.

## 7. Check for BOM or Encoding Issues

The file should be UTF-8 without BOM. If you're editing in certain editors, make sure to save as UTF-8 without BOM.

## 8. Verify Plugin Directory Structure

WordPress expects:
```
wp-content/plugins/
  └── autoscroll-block/
      ├── autoscroll-block.php  ← Main plugin file
      ├── block.json
      ├── build/
      └── ...
```

The main plugin file name should match the directory name (or be the directory name + .php).

