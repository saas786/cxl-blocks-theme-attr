<?php
/**
 * CXL Blocks functionality.
 *
 * @package CXL
 *
 * Plugin Name: CXL Blocks Theme Attr
 * Plugin URI: https://conversionxl.com/institute/
 * Description: Adds a "Theme attribute" field to all blocks, it's for allowing users to configure Vaadin theme attribute in block editor.
 * Author: Leho Kraav
 * Author URI: https://conversionxl.com
 * Version: 2020.04.02
 */

use CXL\Block\Attrs\Plugin;

defined( 'ABSPATH' ) || exit;

require_once __DIR__ . '/vendor/autoload.php';

/**
 * Returns plugin instance.
 *
 * @since 2018.09.15
 */
function cxli(): Plugin {
    return Plugin::get_instance();
}

add_action( 'plugins_loaded', 'cxli', 11 );
