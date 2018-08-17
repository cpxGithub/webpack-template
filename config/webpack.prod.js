const path = require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const CleanWebpackPlugin = require('clean-webpack-plugin')

function resolve(str) {
  return path.resolve(__dirname, '..', str)
}

const prodWepackConf = merge(baseWebpackConfig, {
  performance: {
    hints: "warning", // 枚举
    maxAssetSize: 1000000,
    maxEntrypointSize: 3000000
  },
  mode: 'production',
  output: {
    path: resolve('dist'),
    chunkFilename: 'js/[id].[chunkhash].js',
    filename: 'js/[name].[chunkhash].js'
  },
  optimization: {
    // runtimeChunk: {
    //   name: 'manifest'
    // },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "initial" // initial-提取入口文件公共文件
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin([
      'dist'
    ], {
      root: path.join(__dirname, '../')
    })
  ]
}) 

module.exports = prodWepackConf