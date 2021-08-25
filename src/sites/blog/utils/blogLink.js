import router from '@/router';

const blogComponents = {
  post: 'Blog-Post',
  category: 'Blog-Categories',
};

const blogLink = (link) => {
  if (/^[\w-_]+#./.test(link)) {
    const [type, slug] = link.split(/#/);

    const name = blogComponents[type];

    const location = {
      name,
      params: {
        slug,
      },
    };

    return router.resolve(location).href;
  } if (/^{.*}$/.test(link)) {
    try {
      const location = JSON.parse(link);
      return router.resolve(location).href;
    } catch (e) { /* This is not JSON */ }
  }
  return link;
};

export default blogLink;
