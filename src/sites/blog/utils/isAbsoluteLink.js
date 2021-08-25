const isAbsoluteLink = (link) => (
  /^https?:\/\//.test(link)
);

export default isAbsoluteLink;
