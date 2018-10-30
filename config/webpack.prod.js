process.env.NODE_ENV = 'production'
const path = require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

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
    chunkFilename: 'js/[name].[chunkhash].js',
    filename: 'js/[name].[chunkhash].js'
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'app-styles',
          test: /\.(less|css)$/,
          chunks: 'all',
          enforce: true
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "initial", // initial-提取入口文件公共文件
          priority: 1,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, '../')
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css"
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { safe: true }
    })
  ]
})

if (process.env.npm_config_report) {
  prodWepackConf.plugins.push(
    new BundleAnalyzerPlugin()
  )
}
module.exports = prodWepackConf