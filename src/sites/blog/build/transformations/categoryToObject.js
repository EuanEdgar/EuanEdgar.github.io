const postToListing = require('./postToListing');

const categoryToObject = ({
  name,
  location,
  posts,
  slug,
}) => ({
  name,
  location,
  posts: posts.map(postToListing),
  slug,
});

module.exports = categoryToObject;
