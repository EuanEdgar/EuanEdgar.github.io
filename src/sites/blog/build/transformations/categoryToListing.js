const categoryToListing = ({
  name,
  posts: {
    length: postCount,
  },
  location,
  headerImage,
}) => ({
  name,
  postCount,
  location,
  headerImage,
});

module.exports = categoryToListing;
