const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const config = require('../config/index')
let {resolve, staticPath} = require('./utils')
// process.env.NODE_ENV = 'production'
setTimeout(function() {
  console.log(process.env.NODE_ENV)
},3000)

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    filename: '[name]_[chunkhash].js',
    path: resolve('dist'),
    publicPath: ''
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      'vue': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {

          }
        }
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      // {
      //   test: /\.(jpg|png|gif|jpeg)$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 10240,
      //         name: staticPath('image/[name]_[hash:6].[ext]')
      //       }
      //     }
      //   ]
      // },
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 10240,
      //         name: staticPath('fonts/[name]_[hash:6].[ext]')
      //       }
      //     }
      //   ]
      // },
      // {
      //   test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      //   use: {
      //     loader: 'url-loader',
      //     options: {
      //       limit: 10240,
      //       name: staticPath('medias/[name]_[hash].[ext]')
      //     }
      //   }
      // }
    ]
  },
  plugins: [
    // 将定义过的其他解析规则应用到.vue文件对应语言的块
    new VueLoaderPlugin()
  ]
}