const path = require('path');
const fs = require('fs/promises');

const fileExists = require('../utils/fileExists');

const loadAssets = async (parentDir) => {
  const assetsPath = path.resolve(parentDir, 'assets');
  const hasAssets = await fileExists(assetsPath);
  if (hasAssets) {
    const assetFiles = await fs.readdir(assetsPath);
    const assets = await Promise.all(assetFiles.map(async (assetFile) => {
      const assetPath = path.resolve(assetsPath, assetFile);
      const fileContent = await fs.readFile(assetPath);
      return {
        fileContent,
        assetFile,
      };
    }));
    return assets;
  }
  return [];
};

module.exports = loadAssets;
