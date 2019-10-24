const baseConfig = require('./webpack.base.config')
const { resolve, staticPath, getCssLoaders } = require('./utils')
const config = require('../config')

const webpackMerge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// console.log(process.env.NODE_ENV)
const context = process.env.NODE_ENV || 'development'

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: getCssLoaders({
      usePostcss: true,
      sourceMap: config[context].cssSourceMap
    })
  },
  devServer: {
    contentBase: resolve('dist'),
    port: 8088,
    hot: true,
    open: true,
    quiet: true,
    // 错误的时候出现蒙层
    overlay: {
      errors: true,
      warnings: false
    },
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: 'https://aa.bb.com',
        pathRewrite: { '^/api': '' }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'VERSION': JSON.stringify(require('../package.json').version)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: true
    })
  ]
}

module.exports = webpackMerge(baseConfig, devConfig)