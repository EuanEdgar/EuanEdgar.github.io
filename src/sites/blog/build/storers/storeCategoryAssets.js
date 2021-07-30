const path = require('path');
const fs = require('fs/promises');

const ensureDirExists = require('../utils/ensureDirExists');
const { categoriesDataDir } = require('../constants');

const storeCategoryAssets = async ({ slug, assets }) => {
  if (assets && assets.length) {
    const categoryAssetsFolder = path.resolve(categoriesDataDir, slug, 'assets');

    await ensureDirExists(categoryAssetsFolder);

    await Promise.all(assets.map(async ({ fileContent, assetFile }) => {
      const assetPath = path.resolve(categoryAssetsFolder, assetFile);
      await fs.writeFile(assetPath, fileContent);
    }));
  }
};

module.exports = storeCategoryAssets;
