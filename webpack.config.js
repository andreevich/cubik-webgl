'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    resolve: {fallback: path.join(__dirname, "node_modules")},
    resolveLoader: {fallback: path.join(__dirname, "node_modules")},
    entry: {
        bundle: __dirname + '/dev/bundle'
    },
    output: {
        path: path.resolve(__dirname + '/app/scripts'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    watch: NODE_ENV == 'development'
};

if (NODE_ENV == 'init') {
    module.exports.plugins.push(
        new CopyWebpackPlugin([
                {
                    from: __dirname + '/node_modules/three/build/three.min.js',
                    to: __dirname + '/app/scripts/vendors/three.min.js'
                },
                {
                    from: __dirname + '/node_modules/three/examples/js/controls/OrbitControls.js',
                    to: __dirname + '/app/scripts/vendors/OrbitControls.js'
                },
                {
                    from: __dirname + '/node_modules/three/examples/js/renderers/Projector.js',
                    to: __dirname + '/app/scripts/vendors/Projector.js'
                },
                {
                    from: __dirname + '/node_modules/stats-js/build/stats.min.js',
                    to: __dirname + '/app/scripts/vendors/stats.min.js'
                }
            ]
        )
    );
}