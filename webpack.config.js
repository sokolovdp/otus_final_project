const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    mode: "development", // "production" | "development" | "none"
    entry: './static/js/login.js',
    output: {
        path: path.resolve(__dirname, './static'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env',]
                    }
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
                options: {
                    publicPath: '/otus_final_project/static/images/',
                },
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.less']
    },
    devtool: 'inline-source-map',
    devServer: {
        port: '7000',
        host: '127.0.0.1',
        proxy: {
            '/api/v1/': 'http://127.0.0.1:8000'
            // "secure": false,
            // "changeOrigin": true
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './templates/js/login.html'
        })
    ]
};
