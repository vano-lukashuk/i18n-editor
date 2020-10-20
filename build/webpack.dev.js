const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const {resolve} = require('./config');

module.exports = (env, argv) => {
  return merge(common(env, argv), {
    mode: 'development',
    watch: true,
    devtool: 'source-map',
    watchOptions: {
      ignored: /node_modules/
    },
    output: {
      path: resolve('./app'),
    }
  })
};
