const path = require('path')
const config = require('../config')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')



function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

function staticPath(dir) {
    let staticPath = config[process.env.NODE_ENV] && config[process.env.NODE_ENV].staticPath
    // path.posix在不同的操作系统上获得一致的效果
    return path.posix.join(staticPath, dir || '')
}

function generateStyleLoaders(options = {}) {
    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    // const px2remLoader = {
    //     loader: 'px2rem-loader',
    //     options: {
    //         // 1rem = 75px
    //         remUnit: 192,
    //         // rem装px后小数点个数
    //         remPrecsion: 6
    //     }
    // }

    function generateLoaders(loaderName, loaderOption) {
        const loaders = options.usePostcss ? [cssLoader, postcssLoader] : [cssLoader]
        if (loaderName) {
            loaders.push({
                loader: loaderName + '-loader',
                options: Object.assign({}, loaderOption, {
                    sourceMap: options.sourceMap
                })
            })
        }

        if (options.extract) {
            loaders.unshift(MiniCssExtractPlugin.loader)
            return loaders
            // return ExtractTextPlugin.extract({
            //     use: loaders,
            //     // fallback: 'vue-style-loader'
            // })
        } else {
            // return ['vue-style-loader'].concat(loaders)
            return loaders
        }
    }

    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass')
    }
}

function getCssLoaders(options) {
    const result = []
    const loaders = generateStyleLoaders(options)
    Object.keys(loaders).forEach(name => {
        const loader = loaders[name]
        result.push({
            test: new RegExp('\\.' + name + '$'),
            use: loader
        })
    })

    return result
}

// console.log(getCssLoaders({ usePostcss: true }))





module.exports = {
    resolve,
    staticPath,
    getCssLoaders
}