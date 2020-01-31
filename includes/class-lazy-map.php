<?php
/**
 * The file that defines the core plugin class
 *
 * @link https://github.com/laytan
 * @since 1.0.0
 *
 * @package Lazy_Map
 * @subpackage Lazy_Map/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Lazy_Map
 * @subpackage Lazy_Map/includes
 * @author     Laytan Laats <laytanlaats@hotmail.com>
 */
class Lazy_Map {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Lazy_Map_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Set up the plugin
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		$this->version     = defined( 'LAZY_MAP_VERSION' ) ? LAZY_MAP_VERSION : '1.0.0';
		$this->plugin_name = 'lazy-map';

		$this->load_dependencies();
		$this->set_locale();
		$this->define_block_hooks();
	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Lazy_Map_Loader. Orchestrates the hooks of the plugin.
	 * - Lazy_Map_i18n. Defines internationalization functionality.
	 * - Lazy_Map_Admin. Defines all hooks for the admin area.
	 * - Lazy_Map_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies() {
		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-lazy-map-loader.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-lazy-map-i18n.php';

		/**
		 * The class responsible for the block functionality.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'block/class-lazy-map-block.php';

		$this->loader = new Lazy_Map_Loader();
	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Lazy_Map_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale() {

		$plugin_i18n = new Lazy_Map_I18n();

		$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );
	}

	/**
	 * Register all of the hooks related to the block's functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_block_hooks() {

		$plugin_block = new Lazy_Map_Block( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'init', $plugin_block, 'init' );
		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_block, 'enqueue_frontend_scripts' );
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run() {
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    Lazy_Map_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}
}
