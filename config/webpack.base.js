const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const devMode = process.env.NODE_ENV !== 'production'

// #1669 html-webpack-plugin's default sort uses toposort which cannot
// handle cyclic deps in certain cases. Monkey patch it to handle the case
// before we can upgrade to its 4.0 version (incompatible with preload atm)
const chunkSorters = require('html-webpack-plugin/lib/chunksorter')
const depSort = chunkSorters.dependency
chunkSorters.auto = chunkSorters.dependency = (chunks, ...args) => {
  try {
    return depSort(chunks, ...args)
  } catch (e) {
    // fallback to a manual sort if that happens...
    return chunks.sort((a, b) => {
      // make sure user entry is loaded last so user CSS can override
      // vendor CSS
      if (a.id === 'app') {
        return 1
      } else if (b.id === 'app') {
        return -1
      } else if (a.entry !== b.entry) {
        return b.entry ? -1 : 1
      }
      return 0
    })
  }
}

function resolve(str) {
  return path.resolve(__dirname, '..', str)
}

let htmlOptions = {
  template: 'index.html',
  filename: 'index.html'
}

if (!devMode) { // 生产环境下压缩html
  htmlOptions = {
    ...htmlOptions,
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true
    }
  }
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
      'src': resolve('src'),
      'views': 'src/views',
      'api': 'src/api',
      'components': 'src/components',
      'img': 'src/assets/img',
      'styles': 'src/assets/styles'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        enforce: "pre",
        include: [resolve('src')],
        loader: "eslint-loader",
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: devMode
        }
      },
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
        test: /\.css$/,
        use: [
          devMode ? 'vue-style-loader' : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../'
            }
          },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          devMode ? 'vue-style-loader' : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          { loader: 'css-loader', options: { importLoaders: 1 } },
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
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(htmlOptions),
    new VueLoaderPlugin() // 添加vue-loader必须的插件
  ]
}

module.exports = config