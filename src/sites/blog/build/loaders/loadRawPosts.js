const path = require('path');
const fs = require('fs/promises');

const {
  postsDir,
} = require('../constants');

const loadRawPosts = async () => {
  const folders = await fs.readdir(postsDir);

  return Promise.all(folders.map(async (postFolder) => {
    const jsonPath = path.resolve(postsDir, postFolder, 'post.json');
    const fileData = await fs.readFile(jsonPath, 'utf-8');
    const postJson = JSON.parse(fileData);

    try {
      const markdownPath = path.resolve(postsDir, postFolder, 'post.md');
      // Throws on no file
      await fs.access(markdownPath);
      const markdown = await fs.readFile(markdownPath, 'utf-8');
      postJson.content = markdown;
    } catch (e) {}

    return postJson;
  }));
};

module.exports = loadRawPosts;
