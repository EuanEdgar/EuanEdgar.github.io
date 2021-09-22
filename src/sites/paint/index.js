import registerSite from '@/utils/registerSite';

registerSite({
  name: 'Paint',
  path: '/paint',
  routes: [
    {
      path: '',
      name: 'Paint',
      component: () => import('@/sites/paint/views/Paint'),
    },
  ],
});
