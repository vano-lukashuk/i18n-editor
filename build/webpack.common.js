const autoprefixer = require('autoprefixer');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {resolve} = require('./config');

const path = require("path");

module.exports = (env, argv) => {
  // const env = config.isProduction ? 'production' : 'development';
  const isProduction = argv.mode === 'production';
  const context = resolve("./src");
  const aliasContext = resolve("./src/renderer")
  const outputPath = resolve("dist");

  return {
    target: "electron-renderer",
    context: context,
    devtool: 'source-map',
    entry: {
      build: './renderer'
    },
    output: {
      path: outputPath,
      filename: "[name].js?[hash]",
      chunkFilename: '[name].chunk.js[contenthash]',
      sourceMapFilename: '[file].map[query]',
      publicPath: '/'
    },
    resolve: {
      extensions: ['.vue', '.js', '.scss', '.css', '.json'],
      alias: {
        '@': aliasContext
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
            },
            loaders: {
              scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
            }
          }
        },
        {
          test: /.js$/,
          loader: 'babel-loader?cacheDirectory',
          exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file)
          // include: [config.context]
        },
        /*{
          test: /\.css$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader']
        },*/
        {
          test: /\.css$/,
          // include: [config.context],
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.s[ac]ss$/,
          // include: [config.context],
          use: [
            {
              loader: // MiniCssExtractPlugin.loader,
                'style-loader',
              /*options: {
                sourceMap: !isProduction
              }*/
            },
            {
              loader: 'css-loader',
              /*options: {
                sourceMap: false//!isProduction
              }*/
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader',
              /*options: {
                // data: '@import "~@/scss/_core.scss";',
                sourceMap: false//!isProduction
              }*/
            }
          ]
        },
      ]
    },
    plugins: [
      autoprefixer,
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        filename: './index.html',
        template: './renderer/index.html',
        // inject: true
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css?[hash]'
      }),
      new OptimizeCssAssetsPlugin({
        // assetNameRegExp: /\.scss$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', {discardComments: {removeAll: true}}],
        },
        canPrint: true
      })
    ]
  }
}
