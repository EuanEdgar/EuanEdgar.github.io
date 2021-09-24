<template>
  <canvas
    ref="canvas"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove"
    width="800"
    height="800"
  />
</template>

<script lang="js">
import tools from '@/sites/paint/tools';
import transferItems from './transferItems';

export default {
  data() {
    return {
      context: null,
      undoableStack: [],
      redoableStack: [],
    };
  },
  mounted() {
    this.context = this.$refs.canvas.getContext('2d');
    this.context.lineCap = 'round';
  },
  methods: {
    onMouseDown(e) {
      this.$emit('mousedown', e);
    },
    onMouseUp(e) {
      this.$emit('mouseup', e);
    },
    onMouseMove(e) {
      this.$emit('mousemove', e);
    },
    clearCanvas() {
      const {
        context,
        $refs: {
          canvas,
        },
      } = this;

      context.clearRect(0, 0, canvas.width, canvas.height);
    },
    commitAction(action) {
      this.undoableStack.push(action);
      this.redoableStack = [];
      this.redrawFromUndoableStack();
    },
    redrawFromUndoableStack(depth = 0) {
      if (depth >= 0) {
        this.clearCanvas();
      }

      const {
        undoableStack,
        context,
      } = this;

      undoableStack.slice(depth).forEach((action) => {
        const tool = tools[action.type];

        tool.drawAction(action, context);
      });
    },
    undo(n = 1) {
      const {
        undoableStack,
        redoableStack,
      } = this;

      const count = transferItems(undoableStack, redoableStack, n);
      this.redrawFromUndoableStack();
      return count;
    },
    redo(n = 1) {
      const {
        undoableStack,
        redoableStack,
      } = this;

      const count = transferItems(redoableStack, undoableStack, n);
      if (count > 0) {
        this.redrawFromUndoableStack(-count);
      }
      return count;
    },
  },
};
</script>

<style lang="scss" scoped>
canvas{
  border: 1px solid red;
}
</style>
