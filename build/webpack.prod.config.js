const path = require('path')
const baseConfig = require('./webpack.base.config')
const config = require('../config')
let { resolve, staticPath, getCssLoaders } = require('./utils')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const htmlWebpackPlugin = require('html-webpack-plugin')
// 将css提取成文件的插件，webpack3.xxx
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// 将css提取成文件的插件，webpack4.xxx
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// css优化、压缩插件
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')
// 多进程多实例并行压缩文件
const TerserPlugin = require('terser-webpack-plugin')
// 为webpack模块中间解析提供缓存
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
// 打开8888端口，图形分析打包后文件大小
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')


const context = process.env.NODE_ENV || 'production'

let plugins = [
  new webpack.DefinePlugin({
    'process.env': config[context].env,
    'VERSION': JSON.stringify(require('../package.json').version)
  }),
  new htmlWebpackPlugin({
    filename: 'index.html',
    template: resolve('index.html'),
    inject: true,
    minify: {
      // 根据html5规范解析input
      html5: true,
      // 折叠文档树空白节点
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      // 删除HTML注释
      removeComments: false
    }
  }),
  // webpack3.x时使用的插件，现在也可以用，只是不能用contenthash，可以用其他hash代替
  // 把css单独提取成文件，和style-loader是冲突的，style-loader是放到页面中
  // new ExtractTextPlugin({
  //   // [<hashType>:contenthash:<digestType>:<length>]
  //   // other hashTypes, e.g. sha1, md5, sha256, sha512
  //   // other digestTypes, e.g. hex, base26, base32, base36, base49, base52, base58, base62, base64
  //   // webpack4.3以上包含了contenthash这个关键字，所以该插件文件名称不能使用这个contenthash
  //   filename: staticPath('css/[name].[md5:contenthash:hex:8].css'),
  //   allChunks: true
  // }),
  new MiniCssExtractPlugin({
    filename: staticPath('css/[name]_[contenthash:8].css')
  }),
  // css压缩，使用css的处理器cssnano
  new OptimizeCssPlugin({
    assetNameRegExp: /\.css$/g,
    // 使用cssnano处理器
    cssProcessor: require('cssnano')
  }),
  // 使用DLLPlugin分包的manifest.json
  new webpack.DllReferencePlugin({
    manifest: require('../build-dll/library/library.json')
  }),
  // 提供模块中间缓存步骤
  // FIXME: 能极大的提升时间，但是目前存在错误，第二次编译之后会卡在webpack编译进程出不来
  // new HardSourceWebpackPlugin(),
  // 监听构建错误，可以做上报或者其他统计类功能
  function () {
    this.hooks.done.tap('done', stats => {
      if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1) {
        console.log('build error')
        process.exit(1)
      }
    })
  }
]

// 根据config配置决定是否使用BundleAnalyzerPlugin
config[context].isAnalyzer && plugins.push(new BundleAnalyzerPlugin())



const prodConfig = {
  mode: context,
  stats: config[context].stats,
  output: {
    filename: staticPath('js/[name]_[chunkhash:8].js'),
    chunkFilename: staticPath('js/[id]_[chunkhash:8].js'),
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: getCssLoaders({
      usePostcss: true,
      extract: true,
      sourceMap: config[context].cssSourceMap
    })
  },
  //TODO: 抽时间重新配置splitChunks
  // optimization: {
  //   splitChunks: {
  //     minSize: 1000,
  //     automaticNameDelimiter: '~',
  //     name: module => `${module.name}~module`,
  //     chcheGroups: {
  //       commons: {
  //         name: 'commons',
  //         // 所有类型模块
  //         chunks: 'all',
  //         minChunks: 2,
  //       }
  //     }
  //   }
  // },
  optimization: {
    minimize: true,
    minimizer: [
      // 使用多核并行压缩会在dist下生成一个.LICENSE文件
      new TerserPlugin({
        // 设置true默认值为os.cpus().length - 1
        parallel: true,
        // 开启缓存
        cache: true
      })
    ]
  },
  plugins: plugins
}

let resultConfig = webpackMerge(baseConfig, prodConfig)

if (config[context].isTestSpeed) {
  // 计算打包耗时的插件
  const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
  const smp = new SpeedMeasureWebpackPlugin()
  resultConfig = smp.wrap(webpackMerge(baseConfig, prodConfig))
}


module.exports = resultConfig