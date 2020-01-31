<?php
/**
 * Plugin setup
 *
 * @link https://github.com/laytan
 * @since 1.0.0
 * @package Lazy_Map
 *
 * @wordpress-plugin
 * Plugin Name: Lazy Map
 * Plugin URI:  https://github.com/laytan/lazy-map
 * Description: A gutenberg map block that is lazy loaded for better performance.
 * Version:     1.0.0
 * Author:      Laytan Laats
 * Author URI:  https://github.com/laytan
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: lazy-map
 * Domain Path: /languages
 */

// Abort if called directly.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Lazy map version
 *
 * @link https://semver.org
 */
define( 'LAZY_MAP_VERSION', '1.0.0' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-lazy-map.php';

/**
 * Begins execution of the plugin.
 *
 * @since 1.0.0
 */
function run_lazy_map() {

	$plugin = new Lazy_Map();
	$plugin->run();

}
run_lazy_map();
