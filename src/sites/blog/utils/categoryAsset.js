const categoryAsset = ({ slug }, asset) => (
  // eslint-disable-next-line global-require, import/no-dynamic-require
  require(`@/sites/blog/data/categories/${slug}/assets/${asset}`)
);

export default categoryAsset;
