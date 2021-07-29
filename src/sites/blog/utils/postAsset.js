const postAsset = ({ slug }, asset) => (
  // eslint-disable-next-line global-require, import/no-dynamic-require
  require(`@/sites/blog/data/posts/${slug}/assets/${asset}`)
);

export default postAsset;
