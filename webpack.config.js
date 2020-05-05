// Whilst the configuration object can be modified here, the recommended way of making
// changes is via the presets' options or Neutrino's API in `.neutrinorc.js` instead.
// Neutrino's inspect feature can be used to view/export the generated configuration.
const neutrino = require('neutrino');
const webpack = require('webpack');

module.exports = neutrino().webpack();

const plugin = new webpack.DefinePlugin({
  CONFIG: {
    mode: JSON.stringify(module.exports.mode),
    testAuth: process.env.TEST_AUTH,
    branch: JSON.stringify(process.env.HOME.split('-').slice(-1).pop()),
  },
});
module.exports.plugins.push(plugin);
