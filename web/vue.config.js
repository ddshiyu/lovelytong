const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  outputDir: path.join(__dirname, '/../server/web'),
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      extensions: ['.js', 'vue', '.json'],
      alias: {
        '@': resolve('src')
      }
    }
  }
}