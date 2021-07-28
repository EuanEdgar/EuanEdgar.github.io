const { blogNamespace } = require('../constants');

const locationForCategory = ({ slug }) => ({
  name: `${blogNamespace}-Category`,
  params: {
    slug,
  },
});

module.exports = locationForCategory;
