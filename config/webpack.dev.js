const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const notifier = require('node-notifier')
const chalk = require('chalk')

function resolve(str) {
  return path.resolve(__dirname, '..', str)
}

const port = process.env.PORT || 9000
const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    path: resolve('dist'),
    filename: '[name].js'
  },
  // cheap-module-eval-source-map is faster for development
  devtool: 'cheap-module-eval-source-map',
  devServer: { // 配置webpack-dev-server
    port,
    hot: true,
    compress: true, // 开启gzip
    host: '0.0.0.0',
    clientLogLevel: 'warning',
    historyApiFallback: { // history模式下，重定向到首页
      rewrites: [
        { from: /.*/, to: path.posix.join('/', 'index.html') },
      ],
    },
    quiet: true // 关闭webpack警告与错误提示
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin({ // 错误提示插件，配合devServer配置quiet: true使用
      compilationSuccessInfo: {
        messages: [`App running at: ${chalk.cyan(`http://localhost:${port}`)}`],
      },
      onErrors: (severity, errors) => {
        if (severity !== 'error') {
          return
        }
        const filename = error.file && error.file.split('!').pop()
        notifier.notify({
          title: "Project",
          message: severity + ': ' + error.name,
          subtitle: filename || '',
          icon: path.join(__dirname, 'icon.png')
        })
      }
    })
  ]
})

module.exports = devWebpackConfig