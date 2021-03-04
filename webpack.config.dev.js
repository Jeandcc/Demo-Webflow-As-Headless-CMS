const { baseConfig, pageEntries } = require('./config/webpackBase');

const path = require('path');

baseConfig.mode = 'development';
module.exports = [
  {
    name: 'Local Overrides',
    entry: pageEntries,
    output: {
      path: path.resolve(
        __dirname,
        'local-demo-webflow-as-headless/demo-webflow-as-headless.web.app/scripts/',
      ),
    },
    ...baseConfig,
  },
];
