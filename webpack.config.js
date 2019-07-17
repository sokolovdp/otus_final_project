const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './static/js/login.js',
    output: {
        path: path.resolve(__dirname, './static'),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['babel-preset-env', 'es2015']
                }
            }
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.less']
    },
    devtool: 'inline-source-map',
    devServer: {
        port: '3001',
        host: '0.0.0.0',
        proxy: {
            '/api/v1': 'http://localhost:8000'
        }
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
};
