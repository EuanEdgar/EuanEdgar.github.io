<template>
  <div
    @keydown.z.ctrl.prevent="undo"
    @keydown.y.ctrl.prevent="redo"
    @keydown.z.meta.prevent="undo"
    @keydown.y.meta.prevent="redo"
    tabindex="1"
  >
    <Canvas
      ref="canvas"
      :colour="colour"
      :stroke-width="width"
    />
  </div>
</template>

<script lang="js">
import Canvas from '@/sites/paint/components/Canvas';

export default {
  data() {
    return {
      colour: '#000000',
      width: 15,
    };
  },
  methods: {
    undo() {
      this.$refs.canvas.undo();
    },
    redo() {
      this.$refs.canvas.redo();
    },
  },
  components: {
    Canvas,
  },
};
</script>

<style lang="scss" scoped>
</style>
