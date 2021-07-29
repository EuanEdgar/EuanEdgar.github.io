const fs = require('fs/promises');

const fileExists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = fileExists;
