const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

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
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
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
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // {
      //   test: /\.css$/,
      //   exclude: '/node_modules/',
      //   use: [
      //     'style-loader',
      //     { loader: 'css-loader', options: { importLoaders: 1 } },
      //     'postcss-loader'
      //   ]
      // },
      {
        test: /\.(less|css)$/,
        include: [resolve('src')],
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader", // translates CSS into CommonJS
          options: { importLoaders: 1 }
        }, {
          loader: "less-loader", // compiles Less to CSS
          options: {
            strictMath: true,
            noIeCompat: true
          }
        }, 'postcss-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        include: [resolve('src')],
        loader: 'url-loader',
        options: {
          name: '[name][hash:8].[ext]',
          limit: 8192,
          outputPath: 'img'
        }
        // test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        // loader: 'url-loader',
        // options: {
        //   limit: 10000,
        //   name: 'img/[name].[hash:8].[ext]'
        // }
      }
    ]
  },
  optimization: {
    splitChunks: {
      // name: 'common',
      // filename: 'common.bundle.js',
      // minChunks: 2,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "initial"
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html'
    }),
    new VueLoaderPlugin() // 添加vue-loader必须的插件
  ]
}

module.exports = config