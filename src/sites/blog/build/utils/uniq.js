const uniq = (array) => (
  array.filter((v, i, a) => a.indexOf(v) === i)
);

module.exports = uniq;
