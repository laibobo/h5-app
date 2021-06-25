const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const isDev = process.env.NODE_ENV === 'development'

const getEnv = function(file){
    const fileUrl = path.join(__dirname, file)
    const fileContent = fs.readFileSync(fileUrl, { encoding: 'utf8' })
    const data = fileContent.replace(/\r/g, ',').replace(/\n/g, '').split(',')
    let result = {}
    data.forEach((item)=>{
        if(item){
            const arr = item.split('=')
            if(arr.length == 2){
                const key = trim(arr[0])
                const value = trim(arr[1])
                result[key] = value
            }
        }
    })
    return result
}
const trim = function(value){
    return value.replace(/^\s+|\s+$/g, '')
}

const config = {  
    //https://webpack.docschina.org/configuration/target/
    target: 'web',
    entry: path.join(__dirname, 'src/main.js'),
    output:{
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: ['vue-loader']
        }, 
        {
            test: /\.css$/,
            use: [
                //https://github.com/vuejs/vue-style-loader
                isDev?'vue-style-loader': 
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        esModule:false
                    }
                },
                'css-loader',
                'postcss-loader',
            ]
        },
        {
            test: /\.scss$/,
            use: [
                isDev? 'vue-style-loader':
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        esModule:false
                    }
                },
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ]
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/',
            include: path.resolve(__dirname, 'src'),
            options: {
                presets: ['@babel/preset-env']
            }
        },{
            test: /\.(png|jpe?g|gif)$/i,
            loader: 'url-loader',
            options: {
                limit: 8192,
                name(){
                    return isDev? '[path][name].[ext]' : '[contenthash].[ext]'
                },
                outputPath: 'images'
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'hi h5',
            template: path.join(__dirname, 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                ...getEnv(`.env.${process.env.NODE_ENV}`)
            }
        })
    ],
    resolve:{
        alias:{
            "@": "./src",
            "comp": "./src/components"
        }
    }
}
if(isDev){
    config.devServer = {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 2021,
        host: '0.0.0.0',
        hot: true,
        overlay: {
            warnings: false,
            error: true
        }
    }
    config.plugins.push(new webpack.HotModuleReplacementPlugin)
}
module.exports = config