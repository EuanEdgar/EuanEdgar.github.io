<template>
  <Canvas
    ref="canvas"
    :set-canvas="setCanvas"
    :context-type="animator.contextType"
  />
</template>

<script lang="js">
import Canvas from './Canvas';

export default {
  props: {
    animator: Function,
  },
  data() {
    return {
      canvas: null,
      animation: null,
    };
  },
  computed: {
    canStartAnimation() {
      const {
        canvas: {
          canvas,
          context,
        },
      } = this;

      return canvas && context;
    },
  },
  methods: {
    setCanvas({ canvas, context }) {
      this.canvas = canvas;
      this.context = context;

      this.startAnimation();
    },
    startAnimation() {
      const {
        canvas,
        context,
      } = this;

      this.animation = new this.animator({ canvas, context });
      this.animation.start();
    },
  },
  components: {
    Canvas,
  },
};
</script>

<style lang="scss" scoped>
</style>
