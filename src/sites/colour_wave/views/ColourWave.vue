<template>
  <div id="colour_wave" ref="container" />
</template>

<script lang="js">
import colourWave from '@/sites/colour_wave/utils/colourWave/base';

export default {
  mounted() {
    colourWave(this.$refs.container);
  },
};
</script>

<style lang="scss">
@import '@/sites/colour_wave/style/index.scss';
</style>
