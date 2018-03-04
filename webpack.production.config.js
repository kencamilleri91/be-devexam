'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');

module.exports = {
    entry: [
        'babel-polyfill', // To emulate a full ES6 environment
        path.join(__dirname, 'src/index.js')
    ],
    // Where you want the output to go
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name]-[hash].min.js',
        publicPath: '/'
    },
    plugins: [
        // This plugin helps reduce bundle size by ordering modules and chunks in ascending order of how often they occur
        new webpack.optimize.OccurenceOrderPlugin(),

        // Creates the .html file and inserts any assets necessary due to hash changes in the javascript file to be included. We need a hash in the javascript file in order to perform cache busting whenever we make a new build in production mode
        new HtmlWebpackPlugin({
            template: 'src/index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        }),

        // Since we are using CSS by including it in the JS files (only possibly via css loaders for webpack), we want to seperate the CSS into its own file
        new ExtractTextPlugin('[name]-[hash].min.css'),

        // Reduces file size of the JS file by minification - this can take long in especially big applications and makes debugging impossible, which is why we are only including it in the production build
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                screw_ie8: false // Sometimes we need to not support IE8 because trying to support it can cause the uglifying to produce incorrect try/catch blocks. In this case, however, we don't have any try/catch, so it is safe to just leave this as its default 'false'
            }
        }),
        
        // Optionally, create a stats.json
        // new StatsPlugin('webpack.stats.json', {
        //     source: false,
        //     modules: false
        // }),
        
        // This will allow us to tell in the JS file whether we are in production mode or development mode - the variable process.env.NODE_ENV is set to 'production' when using this configuration
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],

    // ESLint options
    eslint: {
        configFile: '.eslintrc',
        failOnWarning: false,
        failOnError: true
    },

    module: {
        // Runs before loaders
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint'
            }
        ],
        // loaders handle the assets, like transforming sass to css or jsx to js.
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.json?$/,
            loader: 'json'
        }, { // The ExtractTextPlugin will allow us to seperate the SCSS into a seperate stylesheet
            test: /\.scss$/,
            loaders: ["style", "css", "sass"],
        }, {
            test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-woff'
        }, {
            test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/,
            loader: 'file'
        }, {
            test: /\.(jpg|png|svg)$/,
            loader: 'file',
            include: './img'
        },]
    },
    postcss: [
        require('autoprefixer')
    ]
};
