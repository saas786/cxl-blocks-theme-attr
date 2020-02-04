<?php
/**
 * CXL Institute functionality, integrations, features
 *
 * @package ConversionXL
 *
 * Plugin Name: CXL Institute
 * Plugin URI: https://conversionxl.com/institute/
 * Description: Functionality, integrations, features
 * Author: Leho Kraav
 * Author URI: https://conversionxl.com
 * Version: 2020.01.02
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
