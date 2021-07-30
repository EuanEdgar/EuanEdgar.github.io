const path = require('path');

const defaults = require('../content/defaults');

const siteRoot = path.resolve(__dirname, '..');
const contentFolder = path.resolve(siteRoot, './content');

const dataDir = path.resolve(siteRoot, './data');

module.exports = {
  blogNamespace: 'Blog',
  postsDir: path.resolve(contentFolder, './posts'),
  categoriesDir: path.resolve(contentFolder, './categories'),
  defaultsDir: path.resolve(contentFolder, 'defaults'),
  dataDir,
  categoriesDataDir: path.resolve(dataDir, 'categories'),
  postsDataDir: path.resolve(dataDir, 'posts'),
  uncategorisedCategory: 'Uncategorised',
  defaults,
};
