const applyCategoriesToPost = (post, categories) => {
  post.categories = post.categories.map((categoryName) => {
    const category = categories.find(({ name }) => name === categoryName);

    const {
      name,
      location,
      headerImage,
    } = category;

    return {
      name,
      location,
      headerImage,
    };
  });

  if (!post.headerImage) {
    const categoryWithHeaderImage = post.categories.find(({ headerImage }) => headerImage);

    if (categoryWithHeaderImage) {
      post.headerImage = categoryWithHeaderImage.headerImage.assetFile;
      post.assets.push(categoryWithHeaderImage.headerImage);
    }
  }
};

module.exports = applyCategoriesToPost;
