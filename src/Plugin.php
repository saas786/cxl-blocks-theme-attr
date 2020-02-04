<?php
/**
 * Institute implementation
 *
 * @package ConversionXL
 */

namespace CXL\Block\Attrs;

defined( 'ABSPATH' ) || exit;

/**
 * Main class
 */
final class Plugin {

    /**
     * Plugin dir path.
     *
     * @var string
     */
    public $plugin_dir_path;

    /**
     * Plugin dir url.
     *
     * @var string
     */
    public $plugin_dir_url;
    
    /**
     * Singleton pattern
     *
     * @var null|Plugin
     */
    static private $instance;

    /**
     * Clone
     */
    private function __clone() {}

    /**
     * Constructor
     * @throws Exception
     */
    private function __construct() {

        /**
         * Provision plugin context info.
         *
         * @see https://developer.wordpress.org/reference/functions/plugin_dir_path/
         * @see https://stackoverflow.com/questions/11094776/php-how-to-go-one-level-up-on-dirname-file
         */
        $this->plugin_dir_path = trailingslashit( dirname( __DIR__, 1 ) );
        $this->plugin_dir_url  = plugin_dir_url( __FILE__ );
        $this->slug            = basename( $this->plugin_dir_path );

        // Run.
        add_action( 'plugins_loaded', [ $this, 'init' ], 12 );

        if ( is_admin() ) {
            $this->init_admin();
        }

    }

    /**
     * Init
     */
    public function init(): void {

    }


    /**
     * Only `wp-admin`.
     *
     * @SuppressWarnings(PHPMD.ExitExpression)
     * @see https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/issues/1205
     * @since 2018.08.27
     */
    private function init_admin(): void {

    }

    /**
     * Singleton pattern.
     */
    public static function get_instance(): Plugin {

        if ( ! self::$instance ) {
            /** @var Plugin $instance */
            self::$instance = new self();
        }

        return self::$instance;

    }

}
