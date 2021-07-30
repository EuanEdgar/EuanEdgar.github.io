const path = require('path');
const fs = require('fs/promises');

const ensureDirExists = require('../utils/ensureDirExists');
const storeCategoryAssets = require('./storeCategoryAssets');
const { categoriesDataDir } = require('../constants');

const storeCategoryObject = async (categoryObject) => {
  const categoryDir = path.resolve(categoriesDataDir, categoryObject.slug);

  await ensureDirExists(categoryDir);

  const categoryJsonFile = path.resolve(categoryDir, 'category.json');

  const { assets, ...categoryData } = categoryObject;

  await Promise.all([
    fs.writeFile(categoryJsonFile, JSON.stringify(categoryData, null, 2)),
    storeCategoryAssets(categoryObject),
  ]);
};

module.exports = storeCategoryObject;
