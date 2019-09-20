const baseConfig = require('./webpack.base.config')
const webpackMerge = require('webpack-merge')
const webpack = require('webpack')

console.log(process.env.NODE_ENV)

const devConfig = {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
}

module.exports = webpackMerge(baseConfig, devConfig)