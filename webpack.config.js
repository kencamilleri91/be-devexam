'use strict';

/*
Notes:
- This is a DEVELOPMENT configuration geared for fastest build time and providing conveniences such as hot reloading.
- This will start a web server in the memory, so no actual files are created
*/

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'babel-polyfill', // To emulate a full ES6 environment
        'webpack-dev-server/client?http://localhost:3000', // To be able to quickly run a web server in memory to test the application without waiting for long production build times
        'webpack/hot/only-dev-server', // Hot reloading
        'react-hot-loader/patch', // Hot reloading
        path.join(__dirname, 'src/index.js')
    ],
    output: {
        path: path.join(__dirname, '/dist/'), // since this development config doesn't actually produce files, this won't actually appear in the /dist directory if we use this config file
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: 'src/index.tpl.html',
          inject: 'body',
          filename: 'index.html'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development')
        }),
    ],
    eslint: {
        configFile: '.eslintrc',
        failOnWarning: false,
        failOnError: false
    },
    module: { // These loaders essentially replace task runners such as gulp - we can set which file types are handled by which npm package.
        preLoaders: [ // Preloaders are processed first
            { // Running eslint on all the .js files - this will cause eslint to be called every time a .js file is updated
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint'
            }
        ],
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.json?$/,
                loader: 'json'
            },
            {
                test: /\.scss$/,
                loader: 'style!css?modules&localIdentName=[local]!sass'
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file',
                include: './img'
            },
            { test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            { test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/, loader: 'file' }
        ]
    }
};
