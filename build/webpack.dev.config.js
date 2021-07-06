const webpack = require('webpack')
const WebpackBaseConfig = require('./webpack.base.config')
const WebpackMerge = require('webpack-merge')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const path = require('path')
module.exports = WebpackMerge.merge(WebpackBaseConfig, {
  devtool: 'eval-cheap-source-map',
  module: {
    pathinfo: false,
    rules: [
      {
        enforce: 'pre',
        test: /\.(vue|js)$/i,
        loader: 'eslint-loader',
        include: path.join(__dirname, '../src'),
        options: {
          fix: true,
          failOnError: true,
          formatter: require('eslint-friendly-formatter')
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    port: 2021,
    host: '0.0.0.0'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new StyleLintPlugin({
      files: ['**/*.{html,vue,css,scss}'],
      fix: true,
      cache: true,
      emitErrors: true,
      failOnError: false
    })
  ]
})
