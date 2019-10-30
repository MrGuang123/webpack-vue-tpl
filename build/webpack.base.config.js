const path = require('path')
// vue插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const config = require('../config/index')
let { resolve, staticPath } = require('./utils')
// 清空output目录
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
// 运行开发和构建过程中让命令行提示美化
const FriendlyErrorPlugin = require('friendly-errors-webpack-plugin')
// 在工作池中运行loader
const threadLoader = require('thread-loader')

// process.env.NODE_ENV = 'production'

const context = process.env.NODE_ENV || 'development'

// 通过预热worker池来放置启动worker时的高延时
// 这会启动池(pool)内最大数量的 worker 并把指定的模块载入 node.js 的模块缓存中
// worker会受到很多限制，请仅仅在耗时的loader上使用
threadLoader.warmup({
  workers: 3
}, [
    'babel-loader'
  ])

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: {
    app: './src/main.js'
  },
  output: {
    // Cannot use [chunkhash] or [contenthash] for chunk in '[name]_[chunkhash].js' (use [hash] instead)
    filename: '[name].js',
    path: resolve('dist'),
    publicPath: config[context].publicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      '@views': resolve('src/views'),
      'vue': 'vue/dist/vue.common.js'
    },
    mainFields: ['main']
  },
  module: {
    rules: [
      {
        test: /\.(vue|js)$/,
        use: {
          loader: 'eslint-loader',
          // 有同样配置的 loader 会共享一个 worker 池(worker pool)
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        },
        include: [resolve('src')],
        // 定义loader类型，
        enforce: "pre"
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {

          }
        },
        include: [resolve('src')],
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 3
            }
          },
          // 添加?cacheDirectory=true，开启babel缓存，在node_modules下面会有一个.cache目录
          'babel-loader?cacheDirectory=true'
        ],
        exclude: /node_modules/,
        include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')]
      },
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader']
      // },
      // {
      //   test: /\.scss$/,
      //   use: ['style-loader', 'css-loader', 'sass-loader']
      // },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: staticPath('image/[name]_[hash:6].[ext]')
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                // false: creates baseline JPEG file
                progressive: true,
                // 0-100
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                // 1 (brute-force) to 11 (fastest),速度10的质量降低了5％，但比默认速度快8倍。速度11禁用抖动并降低压缩级别
                speed: 4
              },
              gifsicle: {
                // 隔行扫描gif以进行渐进式渲染
                interlaced: false,
              },
              // 将JPG和PNG图像压缩为WEBP
              webp: {
                quality: 75
              }
            }
          },
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: staticPath('fonts/[name]_[hash:6].[ext]')
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10240,
            name: staticPath('medias/[name]_[hash].[ext]')
          }
        }
      }
    ]
  },
  plugins: [
    // 将定义过的其他解析规则应用到.vue文件对应语言的块
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new FriendlyErrorPlugin()
  ]
}