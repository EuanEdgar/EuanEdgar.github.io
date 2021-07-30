const nameToSlug = require('../utils/nameToSlug');
const locationForCategory = require('../locationGetters/locationForCategory');

const buildCategory = (category, { posts: allPosts, defaultCategoryHeaderImage }) => {
  const slug = category.slug || nameToSlug(category.name);
  const location = locationForCategory({ slug });

  const posts = allPosts.filter(({ categories }) => categories.includes(category.name));

  const { headerImage } = category;
  if (!headerImage) {
    category.headerImage = defaultCategoryHeaderImage.assetFile;
    category.assets.push(defaultCategoryHeaderImage);
  }

  return {
    ...category,
    slug,
    location,
    posts,
  };
};

module.exports = buildCategory;
