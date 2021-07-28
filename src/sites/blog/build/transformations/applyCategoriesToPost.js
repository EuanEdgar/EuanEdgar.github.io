const applyCategoriesToPost = (post, categories) => {
  post.categories = post.categories.map((categoryName) => {
    const category = categories.find(({ name }) => name === categoryName);

    const {
      name,
      location,
    } = category;

    return {
      name,
      location,
    };
  });
};

module.exports = applyCategoriesToPost;
