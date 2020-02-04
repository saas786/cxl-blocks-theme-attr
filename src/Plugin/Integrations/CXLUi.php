<?php
/**
 * CXL UI integration.
 *
 * @package CXL
 * @since 2020.02.04
 */

namespace CXL\Block\Attrs\Plugin\Integrations;

/**
 * Main class.
 */
class CXLUi {

    /**
     * Constructor.
     */
    public function __construct() {
        $this->init();
    }

    /**
     * Init.
     */
    protected function init(): void {

        //add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_cxl_ui' ] );
       // add_action( 'enqueue_block_assets', [ $this, 'enqueue_cxl_ui' ] );
        //add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_cxl_ui' ] );
        add_action( 'init', [ $this, 'enqueue_cxl_ui' ] );

    }

    /**
     * Enqueue CXL UI bundle.
     *
     * @since 2020.02.04
     */
    public function enqueue_cxl_ui(): void {

        $deps = [
            'wp-blocks',
            'wp-edit-post',
            'wp-plugins',
            'wp-i18n',
            'wp-element',
            'wp-components',
            'wp-compose',
            'wp-data',
            'lodash',
            'moment',
            'wp-dom-ready',
            'wp-dom',
            'wp-token-list',
        ];

        wp_enqueue_script(
            'cxl-blocks-theme-attr',
            cxl_ui_blocks()->plugin_dir_url . 'public/js/editor.js',
            $deps,
            null,
            true
        );

        // For now, we're adding translations via PHP. In the future, when our
        // tools catch up, we'll internationalize in the JS files.
        wp_localize_script( 'cxl-blocks-theme-attr', 'cxlUIEditor', [
            'labels' => [
                'default'        => __( 'Default',         'cxl-ui' ),
                'designSettings' => __( 'Design Settings', 'cxl-ui' ),
                'none'           => __( 'None',            'cxl-ui' ),
                'shadow'         => __( 'Shadow',          'cxl-ui' ),
                
                // Sizes.
                'sizes' => [
                    'fine'       => __( 'Fine',        'cxl-ui' ),
                    'diminutive' => __( 'Diminutive',  'cxl-ui' ),
                    'tiny'       => __( 'Tiny',        'cxl-ui' ),
                    'small'      => __( 'Small',       'cxl-ui' ),
                    'medium'     => __( 'Medium',      'cxl-ui' ),
                    'large'      => __( 'Large',       'cxl-ui' ),
                    'extraLarge' => __( 'Extra Large', 'cxl-ui' ),
                    'huge'       => __( 'Huge',        'cxl-ui' ),
                    'gargantuan' => __( 'Gargantuan',  'cxl-ui' ),
                    'colossal'   => __( 'Colossal',    'cxl-ui' )
                ]
            ]
        ] );

    }

}
