const path = require('path');
const fs = require('fs/promises');

const {
  defaultsDir,
  defaults: {
    defaultCategoryHeaderImage,
  },
} = require('../constants');

const loadDefaultCategoryHeaderImage = async () => {
  const imagePath = path.resolve(defaultsDir, defaultCategoryHeaderImage);

  const fileContent = await fs.readFile(imagePath);

  return {
    fileContent,
    assetFile: defaultCategoryHeaderImage,
  };
};

module.exports = loadDefaultCategoryHeaderImage;
