import router from '@/router';

const registerSite = (config) => {
  const {
    path: rootPath,
    routes,
  } = config;

  router.addRoute({
    path: rootPath,
    component: {
      name: 'AnonymousRouterView',
      render(c) {
        return c('router-view', { key: this.$router.currentRoute.fullPath });
      },
    },
    children: routes.map(({ path, ...routeConfig }) => ({
      path: path.startsWith('/') ? path.slice(1) : path,
      ...routeConfig,
    })),
  });
};

export default registerSite;
