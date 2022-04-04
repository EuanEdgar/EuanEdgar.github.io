import registerSite from '@/utils/registerSite';

registerSite({
  name: 'Text Generator',
  path: '/text_generator',
  routes: [
    {
      path: '',
      name: 'Text Generator',
      component: () => import('@/sites/textGenerator/views/TextGenerator'),
    },
  ],
});
