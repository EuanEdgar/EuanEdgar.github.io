const { blogNamespace } = require('../constants');

const locationForPost = ({ slug }) => ({
  name: `${blogNamespace}-Post`,
  params: {
    slug,
  },
});

module.exports = locationForPost;
