const path = require('path')
const WebpackMerge = require('webpack-merge')
const WebpackBaseConfig = require('./webpack.base.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = WebpackMerge.merge(WebpackBaseConfig, {
  mode: 'none',
  output: {
    filename: '[name]-[chunkhash:5].js',
    // chunkFilename: '[name]-[chunkhash:5].js',
    publicPath: './',
    path: path.join(__dirname, '../dist'),
    clean: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:6].css',
      chunkFilename: '[id].[contenthash:6].css'
    })
  ],
  optimization: {
    /**
     * 压缩
    */
    minimize: true,
    runtimeChunk: true,
    emitOnErrors: true,
    moduleIds: 'deterministic',
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,

    providedExports: true,
    usedExports: true,
    sideEffects: true,
    /**
     * 生产模式 默认启动
    */
    concatenateModules: true,
    removeAvailableModules: true,
    flagIncludedChunks: true
  }
})
