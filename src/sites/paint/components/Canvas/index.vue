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
import transferItems from './transferItems';

export default {
  props: {
    colour: String,
    strokeWidth: Number,
  },
  data() {
    return {
      click: false,
      context: null,
      currentAction: null,
      undoableStack: [],
      redoableStack: [],
    };
  },
  mounted() {
    this.context = this.$refs.canvas.getContext('2d');
    this.context.lineCap = 'round';
    this.setColour(this.colour);
    this.setStrokeWidth(this.strokeWidth);
  },
  methods: {
    onMouseDown(e) {
      this.click = true;

      this.currentAction = {
        type: 'line',
        points: [[e.clientX, e.clientY]],
      };
      this.context.beginPath();
      this.context.moveTo(e.clientX, e.clientY);
    },
    onMouseUp() {
      this.click = false;

      this.context.closePath();

      if (this.isValidAction(this.currentAction)) {
        this.redoableStack = [];
        this.undoableStack.push(this.currentAction);
        this.currentAction = null;

        this.redrawFromUndoableStack();
      }
    },
    onMouseMove(e) {
      if (this.click) {
        const { context } = this;

        context.lineTo(e.clientX, e.clientY);
        context.stroke();

        this.currentAction.points.push([e.clientX, e.clientY]);
      }
    },
    setColour(colour) {
      this.context.strokeStyle = colour;
      this.context.fillStyle = colour;
    },
    setStrokeWidth(width) {
      this.context.lineWidth = width;
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
    redrawFromUndoableStack() {
      this.clearCanvas();

      const {
        undoableStack,
        context,
      } = this;

      undoableStack.forEach((action) => {
        if (action.type === 'line') {
          const points = [...action.points];
          if (points.length) {
            const firstPoint = points.shift();
            context.beginPath();
            context.moveTo(...firstPoint);
            points.forEach((point) => {
              context.lineTo(...point);
            });
            context.stroke();
            context.closePath();
          }
        }
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
      this.redrawFromUndoableStack();
      return count;
    },
    isValidAction(action) {
      if (!action) {
        return false;
      }

      const { type } = action;
      if (type === 'line') {
        const { points } = action;

        if (points.length < 2) {
          return false;
        }
        if (points.length > 2) {
          return true;
        }
        return (points[0][0] !== points[1][0] || points[0][1] !== points[1][1]);
      }
      return false;
    },
  },
  watch: {
    colour(newColour) {
      this.setColour(newColour);
    },
    strokeWidth(newWidth) {
      this.setStrokeWidth(newWidth);
    },
  },
};
</script>

<style lang="scss" scoped>
canvas{
  border: 1px solid red;
}
</style>
