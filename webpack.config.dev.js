// done in ES6

import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    debug: true,

    // sourcemaps maps transpiled and bundled code back to the original source
    // they get downloaded only if opening devtools, user does not see them or download them
    // inline-source-map --- sourcemap is added as DataUrl in the Javascript  file
    devtool: 'inline-source-map',

    noInfo: false, // shows whats being bundled
    entry: [
        path.resolve(__dirname, 'src/index') // application entry point
    ],
    target: 'web', // or node or electron
    output: {
        // where to generate files
        // but actually no files will be generated and they are served from memory
        path: path.resolve(__dirname, 'src'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        // create HTML file that includes reference to bundled js
        // (lets say you want bundle file name to be dynamic)
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true
        })
    ],
    module: {
        // tell webpack what filetypes to handle
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
            {test: /\.css$/, loaders: ['style', 'css']}
        ]
    }
}
