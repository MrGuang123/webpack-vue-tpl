const baseConfig = require('./webpack.base.config')
const webpackMerge = rquire('webpack-merge')

const devConfig = {
  mode: 'development'
}

module.exports = webpackMerge(baseConfig, devConfig)