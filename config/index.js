module.exports = {
    development: {
        staticPath: 'static',
        env: {
            NODE_ENV: JSON.stringify('development')
        }
    },
    production: {
        staticPath: 'static',
        env: {
            NODE_ENV: JSON.stringify('production')
        }
    }
}