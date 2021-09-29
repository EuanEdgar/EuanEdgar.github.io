<template>
  <div
    @keydown.z.ctrl.prevent="undo"
    @keydown.y.ctrl.prevent="redo"
    @keydown.z.meta.prevent="undo"
    @keydown.y.meta.prevent="redo"

    @keydown.16="shift"
    @keyup.16="unshift"

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
    this.$store.dispatch('selectTool', 'pen');
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
    shift() {
      if (this.$store.state.tool) {
        this.$store.state.tool.setProps({ shift: true });
      }
    },
    unshift() {
      if (this.$store.state.tool) {
        this.$store.state.tool.setProps({ shift: false });
      }
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
