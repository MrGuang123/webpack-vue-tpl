const path = require('path')
const config = require('../config')


function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

function staticPath(dir) {
    console.log(process.env.NODE_ENV, '********')
    let staticPath = config[process.env.NODE_ENV] && config[process.env.NODE_ENV].staticPath
    // path.posix在不同的操作系统上获得一致的效果
    return path.posix.join(staticPath, dir)
}

function generateStyleLoaders() {
    
}



module.exports = {
    resolve,
    staticPath
}