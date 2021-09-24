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
      :tool="tool"
    />
    <Options />
  </div>
</template>

<script lang="js">
import Canvas from '@/sites/paint/components/Canvas';
import Options from '@/sites/paint/components/Options';

export default {
  inject: ['$store'],
  mounted() {
    this.$store.dispatch('setToolSettings', this.toolSettings);
    this.$store.dispatch('selectTool', 'line');
  },
  computed: {
    tool() {
      return this.$store.state.tool;
    },
    toolSettings() {
      const {
        drawLayer,
        toolLayer,
        drawContext,
        toolContext,
        commitAction,
      } = this.$refs.canvas;

      return {
        drawLayer,
        toolLayer,
        drawContext,
        toolContext,
        commitAction,
      };
    },
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
    Options,
  },
};
</script>

<style lang="scss" scoped>
</style>
