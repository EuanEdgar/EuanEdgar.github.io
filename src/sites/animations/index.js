import registerSite from '@/utils/registerSite';

registerSite({
  name: 'Animations',
  path: '/animations',
  routes: [
    {
      path: ':animation',
      name: 'Animations-Animation',
      component: () => import('@/sites/animations/views/Animation'),
    },
  ],
});
