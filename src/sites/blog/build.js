const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const blogNamespace = 'Blog';
const postsDir = path.resolve(__dirname, './posts');
const dataDir = path.resolve(__dirname, './data');

const nameToSlug = (name) => (
  name.trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z\d-]/g, '')
);

const locationForPost = ({ slug, name }) => ({
  name: `${blogNamespace}-Post`,
  params: {
    slug: slug || nameToSlug(name),
  },
});

const locationForCategory = ({ slug }) => ({
  name: `${blogNamespace}-Category`,
  params: {
    slug,
  },
});

const folders = fs.readdirSync(postsDir);
const posts = folders.map((postFolder) => {
  const postJson = JSON.parse(
    fs.readFileSync(path.resolve(postsDir, postFolder, 'post.json')),
  );

  try {
    const markdownPath = path.resolve(postsDir, postFolder, 'post.md');

    fs.accessSync(markdownPath);
    const markdown = fs.readFileSync(markdownPath, 'utf-8');
    postJson.content = markdown;
  } catch (e) {}

  postJson.slug = postJson.slug || nameToSlug(postJson.name);
  postJson.created = new Date(postJson.created);
  postJson.location = locationForPost(postJson);

  return postJson;
});

posts.sort(({ created: a }, { created: b }) => a - b);

const categories = posts.reduce((categories, post) => {
  const { category } = post;
  const categoryName = category || 'Uncategorised';

  if (!categories[categoryName]) {
    categories[categoryName] = [];
  }
  categories[categoryName].push(post);

  return categories;
}, {});

const categoriesList = Object.entries(categories).map(([name, posts]) => {
  const slug = nameToSlug(name);
  return {
    name,
    slug,
    postCount: posts.length,
    location: locationForCategory({ slug }),
  };
});

const categoryObjects = Object.entries(categories).map(([name, posts]) => {
  const slug = nameToSlug(name);

  return {
    name,
    slug,
    posts,
    location: locationForCategory({ slug }),
  };
});

const ensureDirExists = (dir) => {
  try {
    fs.accessSync(dir);
  } catch (e) {
    fs.mkdirSync(dir);
  }
};

fs.rmSync(dataDir, { force: true, recursive: true });
ensureDirExists(dataDir);

const categoriesJsonFile = path.resolve(dataDir, 'categories.json');

const promises = [];

promises.splice(0, 0, fsPromises.writeFile(categoriesJsonFile, JSON.stringify(categoriesList, null, 2)));

const categoriesOutputDir = path.resolve(dataDir, 'categories');
ensureDirExists(categoriesOutputDir);

promises.splice(0, 0, categoryObjects.map((category) => {
  const fileName = path.resolve(categoriesOutputDir, `${category.slug}.json`);
  return fsPromises.writeFile(fileName, JSON.stringify(category, null, 2));
}));

const postsOutputDir = path.resolve(dataDir, 'posts');
ensureDirExists(postsOutputDir);
promises.splice(0, 0, posts.map((post) => {
  const fileName = path.resolve(postsOutputDir, `${post.slug}.json`);
  return fsPromises.writeFile(fileName, JSON.stringify(post, null, 2));
}));

return Promise.all(promises);
