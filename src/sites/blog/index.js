import registerSite from '@/utils/registerSite';

import Home from '@/sites/blog/views/Home';

registerSite({
  name: 'Blog',
  path: '/blog',
  routes: [
    {
      path: '',
      name: 'Blog-Home',
      component: Home,
    },
    {
      path: 'categories',
      name: 'Blog-Categories',
      component: () => import('@/sites/blog/views/Categories'),
    },
    {
      path: 'categories/:slug',
      name: 'Blog-Category',
      component: () => import('@/sites/blog/views/Category'),
    },
    {
      path: 'posts/:slug',
      name: 'Blog-Post',
      component: () => import('@/sites/blog/views/Post'),
    },
  ],
});
