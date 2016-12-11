// done in ES6

import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';


export default {
    debug: true,

    // sourcemaps maps transpiled, minified and bundled code back to the original source
    // they get downloaded only if opening devtools, user does not see them or download them
    // source-map --- slower to build than inline-source-map, but higher quality
    devtool: 'source-map',

    noInfo: false, // shows whats being bundled

    entry: {
        vendor: path.resolve(__dirname, 'src/vendor'),
        main: path.resolve(__dirname, 'src/index') // application entry point
    },
    target: 'web', // or node or electron
    output: {
        // where to generate files
        // but actually no files will be generated and they are served from memory
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[chunkhash].js'   // will be created dynamically. name here is either 'main'' or 'vendor'' from higher up
    },
    plugins: [
        // Generate an external css file with a hash in the filename
        new ExtractTextPlugin('[name].[contenthash].css'),

        // Hash the files using MD5 so that their names change when the content changes.
        // You can set cache expiration date up to a year from now so the user browsers do NOT re-request the js files.
        // By changing the file names, you are "busting cache" in order to force updates for bug fixes and new features
        new WebpackMd5Hash(),

        // Use CommonsChunkPlugin to create a separate bundle
        // of vendor libraries so that they are cached separately
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),

        // create HTML file that includes reference to bundled js
        // (lets say you want bundle file name to be dynamic)
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace:true,
                removeRedundantAttibutes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true,
            // Properties you define here will be available in index.html
            // using htmlWebpackPlugin.options.varName
            // webpack supports various html templating languages.  By default, its EJS -- embedded JS
            trackJSToken: "tracJS assigned token goes here"
        }),

        // eliminate duplicate packages when generating bundle
        new webpack.optimize.DedupePlugin(),

        // minify js
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        // tell webpack what filetypes to handle
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
            //{test: /\.css$/, loaders: ['style', 'css']}
            {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
        ]
    }
}
