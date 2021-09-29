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

  onShiftChange(shift) {
    if (this.action) {
      this.action.square = shift;

      this.toolLayer.clearCanvas();
      Rectangle.drawAction(this.action, this.toolContext);
    }
  }

  isValidAction() {
    return true;
  }

  startAction() {
    this.action = {
      type: 'rectangle',
      colour: this.colour,
      strokeWidth: this.strokeWidth,
      square: this.shift,
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
      square,
    } = action;

    context.strokeStyle = colour;
    context.fillStyle = colour;
    context.lineWidth = strokeWidth;

    context.beginPath();

    const start = origin;
    let end = final;
    if (square) {
      const dist = Math.max(
        Math.abs(end[0] - start[0]),
        Math.abs(end[1] - start[1]),
      );
      let multx = 1;
      let multy = 1;

      if (end[0] < start[0]) {
        multx = -1;
      }
      if (end[1] < start[1]) {
        multy = -1;
      }

      end = [
        start[0] + (dist * multx),
        start[1] + (dist * multy),
      ];
    }

    context.moveTo(...origin);
    context.lineTo(end[0], origin[1]);
    context.lineTo(...end);
    context.lineTo(origin[0], end[1]);
    context.lineTo(...origin);

    context.stroke();
    context.closePath();
  }
}

export default Rectangle;
