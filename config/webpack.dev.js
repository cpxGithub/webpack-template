const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base')
function resolve(str) {
  return path.resolve(__dirname, '..', str)
}

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    path: resolve('dist'),
    // chunkFilename: '[id].js',
    filename: '[name].js'
  },
  // cheap-module-eval-source-map is faster for development
  devtool: 'cheap-module-eval-source-map',
  devServer: { // 配置webpack-dev-server
    port: process.env.HOST || 9000,
    hot: true,
    compress: true, // 开启gzip
    host: '0.0.0.0',
    clientLogLevel: 'warning',
    historyApiFallback: { // history模式下，重定向到首页
      rewrites: [
        { from: /.*/, to: path.posix.join('/', 'index.html') },
      ],
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})

module.exports = devWebpackConfig