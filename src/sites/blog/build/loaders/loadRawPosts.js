const path = require('path');
const fs = require('fs/promises');

const fileExists = require('../utils/fileExists');

const {
  postsDir,
} = require('../constants');

const loadRawPosts = async () => {
  const folders = await fs.readdir(postsDir);

  return Promise.all(folders.map(async (postFolder) => {
    const postDir = path.resolve(postsDir, postFolder);

    const jsonPath = path.resolve(postDir, 'post.json');
    const fileData = await fs.readFile(jsonPath, 'utf-8');
    const postJson = JSON.parse(fileData);

    const markdownPath = path.resolve(postDir, 'post.md');
    const hasMdFile = await fileExists(markdownPath);
    if (hasMdFile) {
      const markdown = await fs.readFile(markdownPath, 'utf-8');
      postJson.content = markdown;
    }

    const assetsPath = path.resolve(postDir, 'assets');
    const postHasAssets = await fileExists(assetsPath);
    if (postHasAssets) {
      const assetFiles = await fs.readdir(assetsPath);
      const assets = await Promise.all(assetFiles.map(async (assetFile) => {
        const assetPath = path.resolve(assetsPath, assetFile);
        const fileContent = await fs.readFile(assetPath);
        return {
          fileContent,
          assetFile,
        };
      }));

      postJson.assets = assets;

      if (postJson.headerImage) {
        const imageName = postJson.headerImage;
        const headerImage = postJson.assets.find(({ assetFile }) => assetFile === imageName);
        if (!headerImage) {
          throw new Error(`Could not find header image '${imageName}' for post '${postJson.name}'`);
        }
      }
    }

    return postJson;
  }));
};

module.exports = loadRawPosts;
