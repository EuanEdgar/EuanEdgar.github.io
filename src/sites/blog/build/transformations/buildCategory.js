const nameToSlug = require('../utils/nameToSlug');
const locationForCategory = require('../locationGetters/locationForCategory');

const buildCategory = (category, { posts: allPosts, defaultCategoryHeaderImage }) => {
  const slug = category.slug || nameToSlug(category.name);
  const location = locationForCategory({ slug });

  const posts = allPosts.filter(({ categories }) => categories.includes(category.name));

  return {
    headerImage: defaultCategoryHeaderImage,
    ...category,
    slug,
    location,
    posts,
  };
};

module.exports = buildCategory;
