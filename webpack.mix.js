/**
 * Laravel Mix configuration file.
 *
 * Laravel Mix is a layer built on top of WordPress that simplifies much of the
 * complexity of building out a Webpack configuration file. Use this file to
 * configure how your assets are handled in the build process.
 *
 * See: https://github.com/JeffreyWay/laravel-mix/blob/fe4c1383bd11d25862b557587c97bafd95594365/docs/installation.md
 *
 * @license   https://www.gnu.org/licenses/gpl-2.0.html GPL-2.0-or-later
 */

// Import required packages.
const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

/*
 * Sets the development path to assets. By default, this is the `/resources`
 * folder in the theme.
 */
const devPath  = 'resources';

/*
 * Sets the path to the generated assets. By default, this is the `/public` folder
 * in the theme. If doing something custom, make sure to change this everywhere.
 */
mix.setPublicPath( 'public' );

/*
 * Set Laravel Mix options.
 *
 * See: https://github.com/JeffreyWay/laravel-mix/blob/fe4c1383bd11d25862b557587c97bafd95594365/docs/url-rewriting.md#css-url-rewriting
 * See: https://github.com/webpack-contrib/terser-webpack-plugin#options
 */
mix.options({
    processCssUrls: false,
    terser: {
        terserOptions: {
            output: {
                comments: false
            }
        },
        extractComments: false
    }
});

/*
 * Builds sources maps for assets.
 *
 * See: https://github.com/JeffreyWay/laravel-mix/blob/fe4c1383bd11d25862b557587c97bafd95594365/docs/api.md#sourcemapsgenerateforproduction-devtype-productiontype
 */
mix.sourceMaps();

/*
 * Versioning and cache busting. Append a unique hash for production assets. If
 * you only want versioned assets in production, do a conditional check for
 * `mix.inProduction()`.
 *
 * See: https://github.com/JeffreyWay/laravel-mix/blob/fe4c1383bd11d25862b557587c97bafd95594365/docs/api.md#versionfiles
 */
mix.version();

mix.
    js( `${devPath}/js/editor.js`, 'js' )
    .react();

/*
 * Extract vendors etc.
 *
 * See: https://github.com/JeffreyWay/laravel-mix/blob/fe4c1383bd11d25862b557587c97bafd95594365/docs/extract.md#L14
 */
mix.extract();

/*
 * Add custom Webpack configuration.
 *
 *
 * See: https://github.com/JeffreyWay/laravel-mix/blob/fe4c1383bd11d25862b557587c97bafd95594365/docs/quick-webpack-configuration.md
 * See: https://webpack.js.org/configuration/
 */
mix.webpackConfig( {
    stats       : 'minimal',
    devtool     : mix.inProduction() ? false : 'source-map',
    performance : { hints  : false    },
    externals   : { jquery : 'jQuery' }
} );
