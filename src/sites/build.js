const buildBlog = require('./blog/build');

const build = (...args) => (
  Promise.all([buildBlog].map((build) => build(...args)))
);

module.exports = build;
