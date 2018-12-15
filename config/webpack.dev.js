const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
module.exports = merge(common('development'), {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve('./dist'),
        port: 9000,
        inline: true
    },
    optimization: {
        // to notice unused
        usedExports: true,
    }
})