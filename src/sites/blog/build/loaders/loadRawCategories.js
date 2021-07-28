const path = require('path');
const fs = require('fs/promises');

const {
  categoriesDir,
} = require('../constants');

const loadRawCategories = async () => {
  const folders = await fs.readdir(categoriesDir);

  return Promise.all(folders.map(async (categoryFolder) => {
    const jsonPath = path.resolve(categoriesDir, categoryFolder, 'category.json');
    const fileData = await fs.readFile(jsonPath, 'utf-8');
    const categoryJson = JSON.parse(fileData);

    return categoryJson;
  }));
};

module.exports = loadRawCategories;
