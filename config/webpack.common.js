const path = require('path')
// const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')

module.exports = mode => {
    const APP_PATH = path.resolve('./app')
    const devMode = mode !== 'production'
    return {
        context: APP_PATH,
        entry: {
            main: './main.js'
        },
        output: {
            path: path.resolve('./dist'),
            chunkFilename: devMode ? '[name].js' : '[name].[chunkhash].js',
            filename: devMode ? '[name].js' : '[name].[chunkhash].js',
            // use import(/* webpackChunkName: "lodash" */ ) to dynamic import
        },
        module: {
            rules: [
                {
                    test: /\.js$/i,
                    include: [path.resolve(APP_PATH, './')],
                    sideEffects: false
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\/iview\/.*\.js$/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                    ],
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/i,
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: '[name].[ext]',
                        outputPath: './assets/images'
                    }
                },
                {
                    test: /\.(ttf|woff|svg)$/i,
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: '[name].[ext]',
                        outputPath: './assets/fonts'
                    }
                },
            ]
        },
        plugins: [
            new CleanWebpackPlugin(['dist'], {
                verbose: true,
                root: path.resolve('./')
            }),
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                template: path.join(APP_PATH, './index.html')
            }),
            new MiniCssExtractPlugin({
                filename: devMode ? '[name].css' : '[name].[hash].css',
                chunkFilename: devMode ? '[name].css' : '[name].[hash].css',
            }),
            new PurgecssPlugin({
                paths: glob.sync([
                  path.join(APP_PATH, './index.html'),
                  path.join(APP_PATH, './**/*.vue'),
                  path.join(APP_PATH, './**/*.js')
                ])
            }),
        ],
        resolve: {
            alias: {
                Components: path.resolve(APP_PATH, './components/'),
                Views: path.resolve(APP_PATH, './views/'),
                Assets: path.resolve(APP_PATH, './assets/'),
                Store: path.resolve(APP_PATH, './store/'),
                Api: path.resolve(APP_PATH, './api/'),
                Filters: path.resolve(APP_PATH, './filters/'),
                Utils: path.resolve(APP_PATH, './utils/'),
            }
        }
    }
}