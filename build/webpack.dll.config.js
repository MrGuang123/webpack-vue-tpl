const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
  // webpack主目录，entry 和 module.rules.loader相对于此目录解析
  context: __dirname,
  mode: 'production',
  entry: {
    library: [
      'vue/dist/vue.common.js',
      'vue-router',
      'vuex'
    ]
  },
  output: {
    filename: '[name]_[chunkhash:8].dll.js',
    path: path.resolve(__dirname, '../build-dll/library'),
    library: '[name]',
    // libraryTarget: 'window'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      // 暴露出的 DLL 的函数名
      name: '[name]',
      path: path.resolve(__dirname, '../build-dll/library/[name].json')
    })
  ]
}