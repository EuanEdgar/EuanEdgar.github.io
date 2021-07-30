const path = require('path');
const fs = require('fs/promises');

const ensureDirExists = require('../utils/ensureDirExists');
const { postsDataDir } = require('../constants');

const storePostAssets = async ({ slug, assets }) => {
  if (assets && assets.length) {
    const postAssetsFolder = path.resolve(postsDataDir, slug, 'assets');

    await ensureDirExists(postAssetsFolder);

    await Promise.all(assets.map(async ({ fileContent, assetFile }) => {
      const assetPath = path.resolve(postAssetsFolder, assetFile);
      await fs.writeFile(assetPath, fileContent);
    }));
  }
};

module.exports = storePostAssets;
