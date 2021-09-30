import DraggableTool from './DraggableTool';

import distance from './utils/distance';
import midpoint from './utils/midpoint';

class Circle extends DraggableTool {
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

    Circle.drawAction(this.action, this.toolContext);
  }

  startAction() {
    this.action = {
      type: 'circle',
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
    const end = final;
    if (square) {
      const center = midpoint(start, end);
      const diameter = distance(start, end);

      context.arc(...center, diameter / 2, 0, Math.PI * 2);
    } else {
      const center = midpoint(start, end);
      const diameter = distance(start, end);

      context.arc(...center, diameter / 2, 0, Math.PI * 2);
    }

    context.stroke();
    context.closePath();
  }
}

export default Circle;
