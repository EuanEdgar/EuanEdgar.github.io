const postToListing = require('./postToListing');

const categoryToObject = ({
  name,
  location,
  posts,
  slug,
  assets,
  headerImage,
}) => ({
  name,
  location,
  posts: posts.map(postToListing),
  slug,
  assets,
  headerImage,
});

module.exports = categoryToObject;
