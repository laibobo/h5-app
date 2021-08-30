const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
// webpack 5 运行于 Node.js v10.13.0+ 的版本。
const devMode = process.env.NODE_ENV === 'development'

const getEnv = function(file){
  const fileUrl = path.join(__dirname, '../' + file)
  const fileContent = fs.readFileSync(fileUrl, { encoding: 'utf8' })
  const data = fileContent.replace(/\r/g, ',').replace(/\n/g, '').split(',')
  const result = {}
  data.forEach((item) => {
    if(item){
      const arr = item.split('=')
      if(arr.length === 2){
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

module.exports = {
  target: 'web',
  mode: 'none',
  entry: path.join(__dirname, '../src/main.js'),
  output: {
    path: path.join(__dirname, '../dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /.vue$/i,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/i,
        include: path.resolve(__dirname, '../src'),
        use: ['cache-loader', 'babel-loader']
      },
      {
        test: /.css$/i,
        use: [
          devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /.scss$/i,
        use: [
          devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        include: path.join(__dirname, '../src/assets/images'),
        type: 'asset'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        include: path.join(__dirname, '../src/assets/fonts'),
        type: 'asset/resource'
      },
      {
        test: /\.svg$/i,
        include: path.join(__dirname, '../src/assets/icons'),
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'hi h5',
      template: path.join(__dirname, '../index.html')
    }),
    /**
     * 设置环境变量
    */
    new webpack.DefinePlugin({
      'process.env': {
        ...getEnv(`.env.${process.env.NODE_ENV}`)
      }
    })
  ],
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    extensions: ['.js', '.vue', '.json', '.css', '.scss'],
    alias: {
      '@': path.join(__dirname, '../src')
    }
  },
  externalsType: 'script',
  // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
  externals: {
    lodash: ['https://cdn.jsdelivr.net/npm/lodash@4.17.19/lodash.min.js', '_'],
    vconsole: ['https://unpkg.com/vconsole/dist/vconsole.min.js', 'VConsole']
  }
}
