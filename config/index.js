module.exports = {
    development: {
        publicPath: '/',
        staticPath: 'static',
        cssSourceMap: true,
        env: {
            NODE_ENV: JSON.stringify('development'),
            API_BASEURL: JSON.stringify('/api')
        }
    },
    production: {
        publicPath: '/',
        staticPath: 'static',
        cssSourceMap: true,
        env: {
            NODE_ENV: JSON.stringify('production'),
            API_BASEURL: JSON.stringify('/api')
        }
    }
}