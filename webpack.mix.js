const mix = require('laravel-mix');
const DashboardPlugin = require('webpack-dashboard/plugin');

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

// mix.copy([
//     'vendor/koolphp/koolreport/src/clients/core',
// ], 'dist/js');

mix.webpackConfig( {
    plugins: [
        new DashboardPlugin()
    ]
} );
