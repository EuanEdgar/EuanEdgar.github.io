import registerSite from '@/utils/registerSite';

registerSite({
  name: 'ColourWave',
  path: '/colour_wave',
  store: async () => import('@/sites/colour_wave/store'),
  routes: [
    {
      path: '',
      name: 'ColourWave-Home',
      component: () => import('@/sites/colour_wave/views/ColourWave'),
    },
    {
      path: 'panic',
      name: 'ColourWave-Panic',
      component: () => import('@/sites/colour_wave/views/Panic'),
    },
  ],
});
