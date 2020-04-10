const HtmlWebPackPlugin = require("html-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

const mode = process.env.WEBPACK_MODE

module.exports = {
    mode: 'development',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }, {
            test: /\.scss$/,
            use: [
                {
                    loader: 'style-loader',
                    options: { 
                        insert: 'head',
                        injectType: 'singletonStyleTag'
                    },
                },
                "css-loader",
                "sass-loader"
            ]
        }, {
            test: /\.(woff2?|ttf|otf|eot)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[path][name].[contenthash].[ext]'
                }
            }
        }, {
            test: /\.(pdf|ico)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        }, {
            test: /\.(svg|png|jpg)$/,
            loader: 'url-loader?limit=100000',
            options: {
                name: '[path][name].[contenthash].[ext]'
            }
        }]
    },
    output: {
        filename: mode === 'production' ? '[name].[contenthash].js' : '[name].[hash].js',
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html"
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        }),
    ],
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({}),
            new UglifyJsPlugin({
                test: /\.js$/,
                cache: true,
                parallel: true,
                sourceMap: true
            })
        ]
    },
    devServer: {
        inline: true,
        host: "0.0.0.0",
        port: 8080
    }
}