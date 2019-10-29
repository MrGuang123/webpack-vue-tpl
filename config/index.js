module.exports = {
    development: {
        publicPath: '/',
        staticPath: 'static',
        cssSourceMap: true,
        env: {
            NODE_ENV: JSON.stringify('development'),
            API_BASEURL: JSON.stringify('/api')
        },
        // 开发和构建过程中命令行信息，errors-only只显示错误，normal正常显示等等
        stats: 'normal'
    },
    production: {
        publicPath: '/',
        staticPath: 'static',
        cssSourceMap: true,
        env: {
            NODE_ENV: JSON.stringify('production'),
            API_BASEURL: JSON.stringify('/api')
        },
        stats: 'errors-only',
        isTestSpeed: false,
        isAnalyzer: false
    }
}