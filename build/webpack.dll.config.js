const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
  mode: 'production',
  entry: {
    library: [
      'vue',
      'vue-router',
      'vuex'
    ]
  },
  output: {
    filename: '[name]_[chunkhash:8].dll.js',
    path: path.resolve(__dirname, '../build-dll/library'),
    library: '[name]'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      // 暴露出的 DLL 的函数名
      name: '[name]_[hash]',
      path: path.resolve(__dirname, '../build-dll/library/[name].json')
    })
  ]
}