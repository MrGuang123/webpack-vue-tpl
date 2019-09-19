const baseConfig = require('./webpack.base.config')
const webpackMerge = require('webpack-merge')
const htmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const prodConfig = {
  mode: 'production',
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('index.html'),
      inject: true
    })
  ]
}

module.exports = webpackMerge(baseConfig, prodConfig)