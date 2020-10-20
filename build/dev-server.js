#!/usr/bin/env node
const webpack = require("webpack");
const yargs = require('yargs');
const webpackDevServer = require("webpack-dev-server")
const webpackDevServerConfig = require("./webpack.dev.server")
const webpackMainConfig = require("./webpack.main")
const webpackRenderConfig = require("./webpack.dev")

let agrv = yargs.argv;

(async () => {
  let renderConfig = webpackRenderConfig(yargs, agrv);
  let devServerConfig = await webpackDevServerConfig(yargs, agrv);
  const server = new webpackDevServer(webpack(renderConfig), devServerConfig);
  server.listen(
    devServerConfig.port,
    devServerConfig.hot,
    err => {
      if (err)
        return console.log(err);
      console.log(
        "dev server is up on  http" +
        (devServerConfig.https ? "s" : "") +
        "://" +
        devServerConfig.host +
        ":" +
        devServerConfig.port
      );
    });

  let mainConfig = webpackMainConfig(yargs, agrv);
  let webpackMain = webpack(mainConfig);
})()
/*server.listen(
  webpackDevServerConfig.port,
  webpackDevServerConfig.host,
  err => {
    if (err) return console.log(err);
    console.log(
      "dev server is up on  http" +
      (webpackDevServerConfig.https ? "s" : "") +
      "://" +
      webpackDevServerConfig.host +
      ":" +
      webpackDevServerConfig.port
    );
  }
);*/
