const webpack = require('webpack');
const path = require('path')
const {resolve} = require('./config')

module.exports = (env, argv) => {
  return {
    mode: 'development',
    watch: true,
    target: 'electron-main',
    entry: './src/main/index.js',
    node: {
      __dirname: false,
      __filename: false
    },
    output: {
      filename: '[name].bundle.js',
      path: resolve('app/main')
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.HOST": argv.host,
        "process.env.PORT": argv.port,
      })
    ]
  }
}
