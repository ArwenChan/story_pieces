const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const APP_PATH = path.resolve('./app')

module.exports = merge(common('production'), {
    mode: 'production',
    // devtool: 'hidden-source-map',
    optimization: {
        runtimeChunk: 'single',
        minimizer: [
            new UglifyJsPlugin({
              cache: true,
              parallel: true,
              sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                    priority: 10,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'initial',
                    priority: 3,
                    reuseExistingChunk: true
                },
                common: {
                    test: /[\\/]api|filters|utils[\\/]/,
                    name: 'common',
                    chunks: 'all',
                    priority: 2,
                },
            }
        }
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new webpack.HashedModuleIdsPlugin(),
    ]
})