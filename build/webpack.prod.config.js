const path = require('path')
const WebpackMerge = require('webpack-merge')
const WebpackBaseConfig = require('./webpack.base.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = WebpackMerge.merge(WebpackBaseConfig, {
  mode: 'none',
  output: {
    filename: '[name]-[chunkhash:5].js',
    chunkFilename: '[name]-[chunkhash:8].js',
    publicPath: './',
    path: path.join(__dirname, '../dist'),
    clean: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:6].css',
      chunkFilename: '[id].[contenthash:6].css'
    }),
    // Webpack 包分析器。交互式可缩放树图可视化 webpack 输出文件的大小
    new BundleAnalyzerPlugin()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          reuseExistingChunk: true,
          chunks: 'all',
          minChunks: 2,
          priority: 10
        },
        vantUI: {
          name: 'chunk-vantUi',
          priority: 20,
          // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
          reuseExistingChunk: true,
          chunks: 'all',
          test: /[\\/]node_modules[\\/]vant[\\/]/
        }
      }
    },
    // 压缩
    minimize: true,
    // 单独打包在浏览器运行过程中，webpack 用来连接模块化应用程序所需的所有代码
    runtimeChunk: true,
    emitOnErrors: true,
    moduleIds: 'deterministic',
    // 如果 chunk 为空，告知 webpack 检测或移除这些 chunk
    removeEmptyChunks: true,
    // 合并含有相同模块的 chunk
    mergeDuplicateChunks: true,
    // 告知 webpack 去确定那些由模块提供的导出内容
    providedExports: true,
    // js tree shaking
    sideEffects: true,
    /**
     * 生产模式 默认启动
    */
    // 告知 webpack 去寻找模块图形中的片段，哪些是可以安全地被合并到单一模块中。这取决于 optimization.providedExports 和 optimization.usedExports
    concatenateModules: true,
    // 如果模块已经包含在所有父级模块中，告知 webpack 从 chunk 中检测出这些模块，或移除这些模块。
    removeAvailableModules: true,
    // 告知 webpack 确定和标记出作为其他 chunk 子集的那些 chunk，其方式是在已经加载过较大的 chunk 之后，就不再去加载这些 chunk 子集。
    flagIncludedChunks: true
  }
})
