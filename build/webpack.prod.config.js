const baseConfig = require('./webpack.base.config')
const webpackMerge = require('webpack-merge')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const config = require('../config')

const path = require('path')

const context = 'production'


console.log(process.env.NODE_ENV,'&&&&&&&&')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const prodConfig = {
  mode: context,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config[context].env,
      VERSION:JSON.stringify('0000000000000000')
    }),
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('index.html'),
      inject: true
    })
  ]
}

module.exports = webpackMerge(baseConfig, prodConfig)