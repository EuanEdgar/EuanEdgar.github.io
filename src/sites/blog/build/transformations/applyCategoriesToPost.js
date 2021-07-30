const categoryToListing = require('./categoryToListing');

const applyCategoriesToPost = (post, categories) => {
  post.categories = post.categories.map((categoryName) => {
    const category = categories.find(({ name }) => name === categoryName);

    return categoryToListing(category);
  });

  if (!post.headerImage) {
    const postCategory = post.categories[0];
    const category = categories.find(({ name }) => name === postCategory.name);

    if (category) {
      post.headerImage = category.headerImage;
      post.assets.push(category.assets.find(({ assetFile }) => assetFile === category.headerImage));
    }
  }
};

module.exports = applyCategoriesToPost;
