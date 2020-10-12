const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {resolve} = require('./config');

const path = require("path");

module.exports = (env, argv) => {
  // const env = config.isProduction ? 'production' : 'development';
  const isProduction = argv.mode === 'production';
  const context = resolve("./src");
  const outputPath = resolve("dist");

  return {
    context: context,
    entry: {
      build: './renderer'
    },
    output: {
      path: outputPath,
      filename: "[name].js?[hash]",
      chunkFilename: '[name].chunk.js[contenthash]',
    },
    resolve: {
      extensions: ['.vue', '.js', '.scss', '.json'],
      alias: {
        '@': context
      }
    },
    module:{
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          // include: [config.context],
          options: {
            // cssSourceMap: !config.isProduction,
            cacheBusting: false,
            transformAssetUrls: {
              video: ['src', 'poster'],
              source: 'src',
              img: 'src',
              image: 'xlink:href'
            }
          }
        },
        {
          test: /.js$/,
          loader: 'babel-loader?cacheDirectory',
          exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file)
          // include: [config.context]
        },
        {
          test: /\.css$/,
          // include: [config.context],
          use: ['vue-style-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          // include: [config.context],
          use: [
            {
              loader: 'vue-style-loader',
              options: {
                sourceMap: !isProduction
              }
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: !isProduction
              }
            },
            /*{
              loader: 'postcss-loader'
            },*/
            {
              loader: 'sass-loader',
              options: {
                data: '@import "~@/scss/_core.scss";',
                sourceMap: !isProduction
              }
            }
          ]
        },
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        filename: './index.html',
        template: './renderer/index.html',
        // inject: true
      }),
    ]
  }
}
