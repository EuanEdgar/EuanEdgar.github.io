import Tool from './Tool';

class Pen extends Tool {
  static options = [
    {
      name: 'colour',
      type: 'colour',
      global: true,
      default: '#000000',
    },
    {
      name: 'strokeWidth',
      type: 'number',
      default: 15,
    },
  ]

  onMouseDown(e) {
    if (this.canStartAction()) {
      this.startAction();

      const point = this.pointFromEvent(e);

      this.action.points.push(point);

      this.toolContext.beginPath();
      this.setColour(this.toolContext, this.colour);
      this.setStrokeWidth(this.toolContext, this.strokeWidth);

      this.toolContext.moveTo(...point);
    }
  }

  onMouseMove(e) {
    if (this.action) {
      const {
        action,
        toolContext,
      } = this;

      const point = this.pointFromEvent(e);

      action.points.push(point);

      toolContext.lineTo(...point);
      toolContext.stroke();
    }
  }

  onMouseUp() {
    const { action } = this;

    this.commitAction(action);
  }

  startAction() {
    this.action = {
      type: 'pen',
      colour: this.colour,
      strokeWidth: this.strokeWidth,
      points: [],
    };
  }

  isValidAction(action) {
    if (!action) {
      return false;
    }

    const { points } = action;
    if (points.length < 2) {
      return false;
    }
    if (points.length > 2) {
      return true;
    }
    return (points[0][0] !== points[1][0] || points[0][1] !== points[1][1]);
  }

  static drawAction(action, context) {
    const points = [...action.points];

    if (points.length) {
      context.strokeStyle = action.colour;
      context.fillStyle = action.colour;
      context.lineWidth = action.strokeWidth;

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
}

export default Pen;
