import inRange from '@/utils/inRange';

import DraggableTool from './DraggableTool';

import angle from './utils/angle';
import squareBox from './utils/squareBox';

class Line extends DraggableTool {
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

    Line.drawAction(this.action, this.toolContext);
  }

  onShiftChange(shift) {
    if (this.action) {
      this.action.square = shift;

      this.redrawToolLayer();
    }
  }

  startAction() {
    this.action = {
      type: 'line',
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
      const theta = Math.abs(angle(start, final, true));

      /*
        337.5 - 22.5
        22.5 - 67.5
        67.5 - 112.5
        112.5 - 157.5
        157.5 - 202.5
        202.5 - 247.5
        247.5 - 292.5
        292.5 - 337.5
      */

      if (inRange(theta, 0, 22.5) || inRange(theta, 337.5, 360)) {
        // Straight up
        end = [start[0], end[1]];
      } else if (inRange(theta, 22.5, 67.5)) {
        // Diag up right
        end = squareBox(start, end);
      } else if (inRange(theta, 67.5, 112.5)) {
        // Straight right
        end = [end[0], start[1]];
      } else if (inRange(theta, 112.5, 157.5)) {
        // Diag down right
        end = squareBox(start, end);
      } else if (inRange(theta, 157.5, 202.5)) {
        // Straight down
        end = [start[0], end[1]];
      } else if (inRange(theta, 202.5, 247.5)) {
        // Diag down left
        end = squareBox(start, end);
      } else if (inRange(theta, 247.5, 292.5)) {
        // Straight left
        end = [end[0], start[1]];
      } else if (inRange(292.5, 337.5)) {
        // Diag up right
        end = squareBox(start, end);
      }
    }

    context.moveTo(...start);
    context.lineTo(...end);
    context.stroke();
    context.closePath();
  }
}

export default Line;
