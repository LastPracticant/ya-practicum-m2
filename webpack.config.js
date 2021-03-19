const webpackConfigApp = require('./webpack.config.app');
const webpackConfigSsr = require('./webpack.config.ssr');

module.exports = [
    webpackConfigApp,
    webpackConfigSsr,
];
