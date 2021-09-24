import Tool from './Tool';

class Rectangle extends Tool {
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
    const point = this.pointFromEvent(e);

    this.startAction();
    this.action.origin = point;
  }

  onMouseMove(e) {
    if (this.action) {
      const point = this.pointFromEvent(e);
      this.action.final = point;

      this.toolLayer.clearCanvas();

      Rectangle.drawAction(this.action, this.toolContext);
    }
  }

  onMouseUp() {
    const { action } = this;
    this.commitAction(action);
  }

  isValidAction() {
    return true;
  }

  startAction() {
    this.action = {
      type: 'rectangle',
      colour: this.colour,
      strokeWidth: this.strokeWidth,
      origin: null,
      final: null,
    };
  }

  static drawAction(action, context) {
    const {
      origin,
      final,
      colour,
      strokeWidth,
    } = action;

    context.strokeStyle = colour;
    context.fillStyle = colour;
    context.lineWidth = strokeWidth;

    context.beginPath();

    context.moveTo(...origin);
    context.lineTo(final[0], origin[1]);
    context.lineTo(...final);
    context.lineTo(origin[0], final[1]);
    context.lineTo(...origin);

    context.stroke();
    context.closePath();
  }
}

export default Rectangle;
