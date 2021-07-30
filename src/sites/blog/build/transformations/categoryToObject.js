const postToListing = require('./postToListing');

const categoryToObject = ({
  name,
  location,
  posts,
  slug,
  headerImage,
}) => ({
  name,
  location,
  posts: posts.map(postToListing),
  slug,
  headerImage,
});

module.exports = categoryToObject;
