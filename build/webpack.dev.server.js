const path = require('path');
const portfinder = require('portfinder');

module.exports = async (env, argv) => {
  let port = await portfinder.getPortPromise()
  return {
    clientLogLevel: 'warning',
    hot: true,
    hotOnly: true,
    port: port,
    host: 'localhost',
    https: true
  }
}
