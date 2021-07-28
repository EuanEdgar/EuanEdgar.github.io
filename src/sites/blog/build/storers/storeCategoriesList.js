const path = require('path');
const fs = require('fs/promises');
const { dataDir } = require('../constants');

const storeCategoriesList = async (categoriesList) => {
  const categoriesJsonFile = path.resolve(dataDir, 'categories.json');
  await fs.writeFile(categoriesJsonFile, JSON.stringify(categoriesList, null, 2));
};

module.exports = storeCategoriesList;
