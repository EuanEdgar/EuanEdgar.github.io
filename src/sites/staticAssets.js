const path = require('path');

const blogAssets = require('./blog/staticAssets');

const staticAssets = ({ outputDir }) => {
  const createConfig = (site, assets) => {
    if (!(assets instanceof Array)) {
      // eslint-disable-next-line no-param-reassign
      assets = [assets];
    }

    return assets.map(({ path: srcPath, target, ...config }) => ({
      from: path.resolve(__dirname, site, srcPath),
      to: path.resolve(outputDir, target),
      ignore: [
        '.DS_Store',
      ],
      ...config,
    }));
  };

  return [
    ...createConfig('blog', blogAssets),
  ];
};

module.exports = staticAssets;
