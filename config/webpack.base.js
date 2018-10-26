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
      'api': '@/api',
      'img': '@/assets/img',
      'styles': '@/assets/styles'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [resolve('src')]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
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
        loader: 'url-loader',
        include: [resolve('src')],
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