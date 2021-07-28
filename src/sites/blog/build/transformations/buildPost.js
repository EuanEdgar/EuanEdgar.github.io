const nameToSlug = require('../utils/nameToSlug');
const locationForPost = require('../locationGetters/locationForPost');

const { uncategorisedCategory } = require('../constants');

const buildPost = (post) => {
  let categories = (post.categories || []).filter((category) => category !== uncategorisedCategory);
  if (!categories.length) {
    categories = [uncategorisedCategory];
  }

  const slug = post.slug || nameToSlug(post.name);
  const created = new Date(post.created);
  const location = locationForPost({ slug });

  return {
    ...post,
    slug,
    created,
    location,
    categories,
  };
};

module.exports = buildPost;
