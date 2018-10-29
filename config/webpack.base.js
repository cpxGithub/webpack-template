const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
function resolve(str) {
  return path.resolve(__dirname, '..', str)
}

const config = {
  entry: {
    app: './src/main.js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'views': '@/views',
      'components': '@/components',
      'img': '@/assets/img'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        include: [resolve('src')],
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        include: [resolve('src')],
        loader: 'babel-loader'
      },
      {
        test: /\.(less|css)$/,
        include: [resolve('src')],
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader', // postcss-loader必须在less-loader之前
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        include: [resolve('src')],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html'
    }),
    new VueLoaderPlugin(), // 添加vue-loader必须的插件
  ]
}

module.exports = config