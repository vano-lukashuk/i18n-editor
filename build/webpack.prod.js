const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const {resolve} = require('./config');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  return merge(common(env, argv), {
    mode: 'production',
    output: {
      path: resolve('./app')
    },
    devtool: false,
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: false // set to true if you want JS source maps
        }),
      ]
    }
  })
};
