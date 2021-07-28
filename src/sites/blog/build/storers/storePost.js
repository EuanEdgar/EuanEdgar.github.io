const path = require('path');
const fs = require('fs/promises');
const { postsDataDir } = require('../constants');

const storePost = async (post) => {
  const postJsonFile = path.resolve(postsDataDir, `${post.slug}.json`);
  await fs.writeFile(postJsonFile, JSON.stringify(post, null, 2));
};

module.exports = storePost;
