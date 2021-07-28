const categoryToListing = ({
  name,
  posts: {
    length: postCount,
  },
  location,
}) => ({
  name,
  postCount,
  location,
});

module.exports = categoryToListing;
