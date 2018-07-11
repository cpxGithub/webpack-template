const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve(str) {
  return path.resolve(__dirname, '..', str)
}

const config = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: resolve('dist'),
    chunkFilename: 'js/[id].[chunkhash].js',
    filename: 'js/[name].[chunkhash].js'
  },
  devServer: { // 配置webpack-dev-server
    port: 9000,
    compress: true // 开启gzip
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [resolve('src')],
        loader: 'babel-loader'
        // options: {
        //   presets: ['@babel/preset-env']
        // }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html'
    })
  ]
}

module.exports = config