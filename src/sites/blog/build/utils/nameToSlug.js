const nameToSlug = (name) => (
  name.trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^-a-z\d]/g, '')
);

module.exports = nameToSlug;
