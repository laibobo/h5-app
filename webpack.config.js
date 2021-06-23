const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output:{
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-laoder'
        }, {
            test: /.css$/,
            oneOf: [{
                //https://vue-loader.vuejs.org/zh/guide/css-modules.html#%E5%8F%AF%E9%80%89%E7%94%A8%E6%B3%95
                resourceQuery: /module/,
                use: [
                    'vue-style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[local]_[hash:base64:8]'
                        }
                    },
                    'postcss-loader',
                ]
            }]
        },{
            test: /\.scss$/,
            use: [
                'vue-style-loader', 
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                },
                'postcss-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        //https://vue-loader.vuejs.org/zh/guide/pre-processors.html#sass
                        indentedSyntax: true, 
                        sassLoader: {
                            indentedSyntax: true
                        }
                    }
                }
            ]
        },{
           test: /\.js$/,
           loader: 'babel-loader' 
        },{
            test: /\.(png|jpe?g|gif)$/i,
            loader: 'url-loader',
            options: {
                limit: 8192,
                name(){
                    if (process.env.NODE_ENV === 'development') {
                        return '[path][name].[ext]'
                    }        
                    return '[contenthash].[ext]'
                },
                outputPath: 'images'
            }
        }]
    },
    devServer: {
        contenBase: path.join(__dirname, 'dist'),
        port: 2021,
        host: '0.0.0.0',
        hot: true,
        compress: true,
        open: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ]
}