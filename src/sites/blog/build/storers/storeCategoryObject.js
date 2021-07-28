const path = require('path');
const fs = require('fs/promises');
const { categoriesDataDir } = require('../constants');

const storeCategoriesList = async (categoryObject) => {
  const categoryJsonFile = path.resolve(categoriesDataDir, `${categoryObject.slug}.json`);
  await fs.writeFile(categoryJsonFile, JSON.stringify(categoryObject, null, 2));
};

module.exports = storeCategoriesList;
