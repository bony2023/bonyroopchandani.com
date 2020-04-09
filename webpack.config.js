const HtmlWebPackPlugin = require("html-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./public/index.html",
    filename: "./index.html"
});

module.exports = {
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
            test: /\.(ico|pdf|woff2?|ttf|otf|eot)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        }, {
            test: /\.(svg|png|jpg)$/,
            loader: 'url-loader?limit=100000'
        }]
    },
    plugins: [htmlPlugin],
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
};