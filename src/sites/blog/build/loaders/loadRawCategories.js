const path = require('path');
const fs = require('fs/promises');

const {
  categoriesDir,
} = require('../constants');

const loadAssets = require('./loadAssets');

const loadRawCategories = async () => {
  const folders = await fs.readdir(categoriesDir);

  return Promise.all(folders.map(async (categoryFolder) => {
    const categoryDir = path.resolve(categoriesDir, categoryFolder);
    const jsonPath = path.resolve(categoryDir, 'category.json');
    const fileData = await fs.readFile(jsonPath, 'utf-8');
    const categoryJson = JSON.parse(fileData);

    const assets = await loadAssets(categoryDir);
    categoryJson.assets = assets;

    if (categoryJson.headerImage) {
      const imageName = categoryJson.headerImage;
      const headerImage = categoryJson.assets.find(({ assetFile }) => assetFile === imageName);
      if (!headerImage) {
        throw new Error(`Could not find header image '${imageName}' for category '${categoryJson.name}'`);
      }
    }

    return categoryJson;
  }));
};

module.exports = loadRawCategories;
