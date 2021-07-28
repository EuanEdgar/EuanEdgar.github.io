const fs = require('fs/promises');

const ensureDirExists = async (dir) => {
  try {
    await fs.access(dir);
  } catch (e) {
    await fs.mkdir(dir);
  }
};

module.exports = ensureDirExists;
