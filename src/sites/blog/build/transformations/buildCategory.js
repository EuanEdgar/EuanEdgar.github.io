const nameToSlug = require('../utils/nameToSlug');
const locationForCategory = require('../locationGetters/locationForCategory');

const buildCategory = (category, { posts: allPosts, defaultCategoryHeaderImage }) => {
  const slug = category.slug || nameToSlug(category.name);
  const location = locationForCategory({ slug });

  const posts = allPosts.filter(({ categories }) => categories.includes(category.name));

  const { headerImage } = category;
  debugger;
  if (!headerImage) {
    category.headerImage = defaultCategoryHeaderImage.headerImage;
    category.assets.push(defaultCategoryHeaderImage.asset);
  }

  return {
    ...category,
    slug,
    location,
    posts,
  };
};

module.exports = buildCategory;
