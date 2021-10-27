<template>
<div>
  <canvas
    ref="canvas"
    :height="screenHeight"
    :width="screenWidth"
  />
</div>
</template>

<script lang="">
export default {
  props: {
    contextType: String,
    setCanvas: Function,
  },
  data() {
    return {
      context: null,
      canvas: null,
    };
  },
  computed: {
    screenHeight() {
      return window.innerHeight;
    },
    screenWidth() {
      return window.innerWidth;
    },
  },
  mounted() {
    const {
      canvas,
    } = this.$refs;

    this.canvas = canvas;
  },
  watch: {
    canvas: {
      immediate: true,
      handler(canvas) {
        if (canvas) {
          this.context = canvas.getContext(this.contextType);

          this.setCanvas({ canvas, context: this.context });
        } else if (this.context) {
          this.context = null;
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  height: 100vh;
  width: 100vw;
}
</style>
