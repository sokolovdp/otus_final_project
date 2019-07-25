const merge = require('webpack-merge');
const common = require('./webpack.common.js');


module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: '7000',
        host: '127.0.0.1',
        proxy: {
            '/api/v1/': 'http://127.0.0.1:8000',
            // "secure": false,
            // "changeOrigin": true
        }
    },
});