const buildBlog = require('./blog/build');

const build = () => (
  Promise.all([buildBlog].map((build) => build()))
);

module.exports = build;
