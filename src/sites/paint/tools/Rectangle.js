import DraggableTool from './DraggableTool';

import squareBox from './utils/squareBox';

class Rectangle extends DraggableTool {
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

  redrawToolLayer() {
    this.toolLayer.clearCanvas();

    Rectangle.drawAction(this.action, this.toolContext);
  }

  onShiftChange(shift) {
    if (this.action) {
      this.action.square = shift;

      this.redrawToolLayer();
    }
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
      end = squareBox(start, end);
    }

    context.moveTo(...start);
    context.lineTo(end[0], start[1]);
    context.lineTo(...end);
    context.lineTo(start[0], end[1]);
    context.lineTo(...start);

    context.stroke();
    context.closePath();
  }
}

export default Rectangle;
