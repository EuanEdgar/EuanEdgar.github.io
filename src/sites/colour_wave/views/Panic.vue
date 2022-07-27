<template>
  <div id="colour_wave" ref="container" />
</template>

<script lang="js">
import panic from '@/sites/colour_wave/utils/colourWave/base/panic';

export default {
  mounted() {
    panic(this.$refs.container);
  },
};
</script>

<style lang="scss">
@import '@/sites/colour_wave/style/index.scss';
</style>
