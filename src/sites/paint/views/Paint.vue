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
      :colour="colour"
      :stroke-width="width"
    />
  </div>
</template>

<script lang="js">
import Canvas from '@/sites/paint/components/Canvas';
import Line from '@/sites/paint/tools/Line';

export default {
  data() {
    return {
      colour: '#000000',
      width: 15,
      tool: null,
      selectedTool: 'line',
    };
  },
  mounted() {
    if (!this.tool) {
      this.tool = new this.toolClass(this.toolProps);
    }
  },
  computed: {
    toolProps() {
      const {
        colour,
        width,
      } = this;

      const {
        drawContext,
        toolContext,
        commitAction,
      } = this.$refs.canvas;

      return {
        drawContext,
        toolContext,
        commitAction,
        colour,
        strokeWidth: width,
      };
    },
    toolClass() {
      const { selectedTool } = this;

      switch (selectedTool) {
        case 'line':
          return Line;
        default:
          throw new Error(`Unknown tool type ${selectedTool}`);
      }
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
  watch: {
    colour(newColour) {
      this.tool.colour = newColour;
    },
    width(newWidth) {
      this.tool.strokeWidth = newWidth;
    },
  },
  components: {
    Canvas,
  },
};
</script>

<style lang="scss" scoped>
</style>
