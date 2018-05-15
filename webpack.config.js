const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
let filename = 'static';
let devtool = 'source-map';
let plugins = [
    new HtmlWebpackPlugin({
        template: __dirname + "/views/index.ejs",
        filename: 'index.html'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin("./css/[name]-[hash].css"),
    new CleanWebpackPlugin(`${filename}`, {
        root: __dirname,
        verbose: true,
        dry: false,
        exclude: ['public']
    })
];
if (process.argv.includes('development')) {
    plugins.pop()
}
if (process.argv.includes('production')) {
    filename = 'static';
    devtool = 'none'
}
module.exports = {
    devtool: devtool,
    entry: __dirname + '/APP/main.jsx',
    output: {
        path: __dirname + '/'+filename,
        filename: 'build.js',
        chunkFilename: '[name].[chunkhash:5].chunk123.js',
        publicPath: '/'
    },
    devServer: {
        contentBase: './static',
        port: 3000,
        inline: true,
        historyApiFallback: true/*,
        openPage: 'index.ejs'*/,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /(\.js|\.jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['stage-1', 'react']/*env*/
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'img/[name][hash:5].[ext]',
                        limit: 10000,
                        publicPath: '/'
                    }
                }
            },
            {
                test: /(\.sass|\.css|\.scss)$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]--[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'sass-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            }
        ]
    },
    plugins: plugins,
    resolve: {
        extensions: ['.js', '.jsx']
    },
    node: {
        fs: "empty"
    }
}