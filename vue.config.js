const path = require('path');
const RunScriptPlugin = require('./webpack/RunScriptPlugin');

module.exports = {
  lintOnSave: false,
  outputDir: path.resolve(__dirname, 'docs'),
  configureWebpack: {
    plugins: [
      new RunScriptPlugin(path.resolve(__dirname, 'src', 'sites', 'build')),
    ],
  },
};
