<template>
  <div>
    <Canvas
      ref="drawLayer"
      :colour="colour"
      :strokeWidth="strokeWidth"
    />
    <Canvas
      ref="toolLayer"
      class="tool"
      :colour="colour"
      :strokeWidth="strokeWidth"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
      @mousemove="onMouseMove"
    />
  </div>
</template>

<script lang="js">
import Canvas from './Canvas';

export default {
  props: {
    colour: String,
    strokeWidth: Number,
    tool: Object,
  },
  data() {
    return {
      drawContext: null,
      toolContext: null,
    };
  },
  mounted() {
    const {
      drawLayer,
      toolLayer,
    } = this;

    this.drawContext = drawLayer.context;
    this.toolContext = toolLayer.context;
  },
  methods: {
    onMouseDown(e) {
      this.tool.onMouseDown(e);
    },
    onMouseUp(e) {
      this.tool.onMouseUp(e);
    },
    onMouseMove(e) {
      this.tool.onMouseMove(e);
    },
    commitAction(action) {
      const {
        drawLayer,
      } = this.$refs;

      drawLayer.commitAction(action);
    },
    undo() {
      this.$refs.drawLayer.undo();
    },
    redo() {
      this.$refs.drawLayer.redo();
    },
  },
  computed: {
    drawLayer() {
      return this.$refs.drawLayer;
    },
    toolLayer() {
      return this.$refs.toolLayer;
    },
  },
  components: {
    Canvas,
  },
};
</script>

<style lang="scss" scoped>
div {
  position: relative;

  canvas {
    &.tool {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>
