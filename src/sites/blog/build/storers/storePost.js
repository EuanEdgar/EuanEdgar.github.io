const path = require('path');
const fs = require('fs/promises');

const { postsDataDir } = require('../constants');
const ensureDirExists = require('../utils/ensureDirExists');

const storePostAssets = require('./storePostAssets');

const storePost = async (post) => {
  const postFolder = path.resolve(postsDataDir, post.slug);
  await ensureDirExists(postFolder);

  const postJsonFile = path.resolve(postsDataDir, postFolder, 'post.json');

  const { assets, ...postData } = post;

  await Promise.all([
    fs.writeFile(postJsonFile, JSON.stringify(postData, null, 2)),
    storePostAssets(post, postsDataDir),
  ]);
};

module.exports = storePost;
