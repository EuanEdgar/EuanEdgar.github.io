const fs = require('fs/promises');

const {
  dataDir,
  categoriesDataDir,
  postsDataDir,
} = require('./constants');

const uniq = require('./utils/uniq');

const loadRawPosts = require('./loaders/loadRawPosts');
const loadRawCategories = require('./loaders/loadRawCategories');

const buildPost = require('./transformations/buildPost');

const reconcileCategories = require('./utils/reconcileCategories');
const buildCategory = require('./transformations/buildCategory');

const applyCategoriesToPost = require('./transformations/applyCategoriesToPost');

const categoryToListing = require('./transformations/categoryToListing');
const categoryToObject = require('./transformations/categoryToObject');

const ensureDirExists = require('./utils/ensureDirExists');

const storeCategoriesList = require('./storers/storeCategoriesList');
const storeCategoryObject = require('./storers/storeCategoryObject');
const storePost = require('./storers/storePost');

const build = async () => {
  const rawPosts = await loadRawPosts();
  const rawCategories = await loadRawCategories();

  const posts = rawPosts.map(buildPost);

  const categories = reconcileCategories({
    categoryData: rawCategories,
    categoryNames: uniq(posts.map(({ categories }) => categories).flat()),
  }).map((category) => buildCategory(category, posts));

  posts.forEach((post) => {
    applyCategoriesToPost(post, categories);
  });

  const categoriesList = categories.map(categoryToListing);
  const categoryObjects = categories.map(categoryToObject);

  await fs.rm(dataDir, { force: true, recursive: true });
  await ensureDirExists(dataDir);

  await Promise.all([
    storeCategoriesList(categoriesList),
    ensureDirExists(categoriesDataDir).then(() => (
      Promise.all(categoryObjects.map(storeCategoryObject))
    )),
    ensureDirExists(postsDataDir).then(() => (
      Promise.all(posts.map(storePost))
    )),
  ]);
};

module.exports = build;
