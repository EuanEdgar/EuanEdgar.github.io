const categoryToListing = ({
  name,
  posts: {
    length: postCount,
  },
  location,
  slug,
  headerImage,
}) => ({
  name,
  postCount,
  location,
  slug,
  headerImage,
});

module.exports = categoryToListing;
