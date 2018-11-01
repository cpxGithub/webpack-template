process.env.NODE_ENV = 'production'
const path = require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

function resolve(str) {
  return path.resolve(__dirname, '..', str)
}

const prodWepackConf = merge(baseWebpackConfig, {
  performance: {
    hints: 'warning', // 枚举
    maxAssetSize: 819200,
    maxEntrypointSize: 819200
  },
  mode: 'production',
  output: {
    path: resolve('dist'),
    chunkFilename: 'js/[name].[contenthash].js',
    filename: 'js/[name].[contenthash].js'
  },
  optimization: {
    // runtimeChunk: {
    //   name: 'manifest'
    // },
    // nodeEnv: 'production',
    moduleIds: 'hashed',
    namedChunks: true,
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'initial', // initial-提取入口文件公共文件chunks: 'initial', // initial-提取入口文件公共文件
          priority: 1,
          reuseExistingChunk: true
        },
        elementUI: {
          name: 'elementUI', // 单独将 elementUI 拆包
          priority: 3,
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]element-ui[\\/]/,
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
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'js/[name].[contenthash].css'
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