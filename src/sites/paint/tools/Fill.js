import Tool from './Tool';

class Fill extends Tool {
  static options = [
    {
      name: 'colour',
      type: 'colour',
      global: true,
      default: '#000000',
    },
  ]

  onMouseDown(e) {
    if (this.canStartAction()) {
      const point = this.pointFromEvent(e);

      this.startAction({ point });
    }
  }

  onMouseMove(e) {
    if (this.action) {
      const point = this.pointFromEvent(e);
      this.action.point = point;
    }
  }

  onMouseUp() {
    const { action } = this;

    this.commitAction(action);
  }

  startAction({ point }) {
    this.action = {
      type: 'fill',
      colour: this.colour,
      point,
    };
  }

  static drawAction(action, context) {
    const {
      point,
      colour,
    } = action;

    console.log(getColourHex(colour));

    floodFill(context, ...point, getColourHex(colour));
  }
}

function getPixel(pixelData, x, y) {
  if (x < 0 || y < 0 || x >= pixelData.width || y >= pixelData.height) {
    return -1; // impossible color
  }
  return pixelData.data[y * pixelData.width + x];
}

function floodFill(ctx, x, y, fillColor) {
  // read the pixels in the canvas
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

  // make a Uint32Array view on the pixels so we can manipulate pixels
  // one 32bit value at a time instead of as 4 bytes per pixel
  const pixelData = {
    width: imageData.width,
    height: imageData.height,
    data: new Uint32Array(imageData.data.buffer),
  };

  // get the color we're filling
  const targetColor = getPixel(pixelData, x, y);

  // check we are actually filling a different color
  if (targetColor !== fillColor) {
    const pixelsToCheck = [x, y];
    while (pixelsToCheck.length > 0) {
      const y = pixelsToCheck.pop();
      const x = pixelsToCheck.pop();

      const currentColor = getPixel(pixelData, x, y);
      if (currentColor === targetColor) {
        pixelData.data[y * pixelData.width + x] = fillColor;
        pixelsToCheck.push(x + 1, y);
        pixelsToCheck.push(x - 1, y);
        pixelsToCheck.push(x, y + 1);
        pixelsToCheck.push(x, y - 1);
      }
    }

    // put the data back
    console.log(pixelData.data[y * pixelData.width + x]);
    ctx.putImageData(imageData, 0, 0);
  }
}

function getColourHex(colour) {
  const d = document.createElement('div');
  d.style.color = colour;
  document.body.appendChild(d);
  // Color in RGB
  const rgb = getComputedStyle(d).color;
  d.remove();

  const [, r, g, b] = /rgb\((\d{0,3}), (\d{0,3}), (\d{0,3})\)/.exec(rgb);
  return parseInt(`FF${pad(parseInt(b, 10).toString(16))}${pad(parseInt(g, 10).toString(16))}${pad(parseInt(r, 10).toString(16))}`, 16);
}

function pad(s) {
  if (s.length === 1) {
    return `0${s}`;
  }
  return s;
}

export default Fill;
