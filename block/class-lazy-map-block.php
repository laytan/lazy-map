<?php
/**
 * The registering of the lazy map block
 *
 * @link       https://github.com/laytan
 * @since      1.0.0
 *
 * @package    Lazy_Map
 * @subpackage Lazy_Map/block
 */

/**
 * Register the block
 *
 * @package    Lazy_Map
 * @subpackage Lazy_Map/admin
 * @author     Laytan Laats <laytanlaats@hotmail.com>
 */
class Lazy_Map_Block {
	/**
	 * The ID of this plugin.
	 *
	 * @since  1.0.0
	 * @access private
	 * @var    string  $plugin_name The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since  1.0.0
	 * @access private
	 * @var    string  $version The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since 1.0.0
	 * @param string $plugin_name The name of this plugin.
	 * @param string $version     The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {
		$this->plugin_name = $plugin_name;
		$this->version     = $version;
	}

	/**
	 * Called on the WordPress init hook.
	 *
	 * Registers the block.
	 *
	 * @since 1.0.0
	 */
	public function init() {
		$asset_file = include( plugin_dir_path( __FILE__ ) . 'dist/lazy-map-block.asset.php' );
		wp_register_script(
			'lazy-map-block',
			plugins_url( 'dist/lazy-map-block.js', __FILE__ ),
			$asset_file['dependencies'],
			$asset_file['version']
		);

		wp_localize_script( 'lazy-map-block', 'assets', array( 'mapPlaceholder' => plugins_url( 'lazy-map/assets/map_placeholder.jpg' ) ) );

		register_block_type(
			'lazy-map/lazy-map-block',
			array(
				'editor_script' => 'lazy-map-block',
			)
		);
	}

	/**
	 * Enqueue our front-end scripts here
	 *
	 * @since 1.0.0
	 */
	public function enqueue_frontend_scripts() {
		// $asset_file = include( plugin_dir_path( __FILE__ ) . 'dist/lazy-map-public.asset.php' );
		// wp_enqueue_script( 'lazy-map-public', plugins_url( 'dist/lazy-map-public.js', __FILE__ ), $asset_file['dependencies'], $asset_file['version'], true );
		wp_enqueue_script( 'lazy-map-public', plugins_url( 'src/lazy-map-public.js', __FILE__ ), null, $this->version, true );
	}
}
