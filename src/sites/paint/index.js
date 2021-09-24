import registerSite from '@/utils/registerSite';

registerSite({
  name: 'Paint',
  path: '/paint',
  store: async () => import('@/sites/paint/store'),
  routes: [
    {
      path: '',
      name: 'Paint',
      component: () => import('@/sites/paint/views/Paint'),
    },
  ],
});
