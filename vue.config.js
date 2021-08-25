const path = require('path');
const RunScriptPlugin = require('./webpack/RunScriptPlugin');

const staticAssets = require('./src/sites/staticAssets');

const outputDir = path.resolve(__dirname, 'docs');

module.exports = {
  lintOnSave: false,
  outputDir,
  chainWebpack: (config) => {
    config.plugin('copy').tap(([paths]) => (
      [
        [
          ...paths,
          ...staticAssets({ outputDir }),
        ],
      ]
    ));
  },
  configureWebpack: {
    plugins: [
      new RunScriptPlugin(path.resolve(__dirname, 'src', 'sites', 'build')),
    ],
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/_variables.scss";
          @import "@/assets/scss/_mixins.scss";
        `,
      },
    },
  },
};
