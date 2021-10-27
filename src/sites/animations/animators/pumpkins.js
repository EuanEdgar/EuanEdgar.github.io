import random from '@/utils/random';
import randomInt from '@/utils/random/int';
import randomItem from '@/utils/random/item';

import permute from '@/utils/permute';

import Animator from './Animator';

const bgColour = '#000000';
const stemColours = [
  '#6b4000',
  '#543506',
  '#845b1e',
  '#442902',
  '#443602',
  '#6d4302',
];
const fleshColours = [
  '#ff8c00',
  '#ffffff',
  '#ecab5c',
  '#ec995c',
  '#e87621',
  '#ca6e1d',
  '#eab87b',
  '#bf7c2b',
  '#efb46d',
  '#ffca00',
  '#f9d650',
  '#e0ba28',
  '#ff6b00',
];

const eyes = [':'];
const mouths = [')', '(', 'o', '§', 'D', 'C', '0', 'P'];
const faces = permute(eyes, mouths).map(([eye, mouth]) => `${eye}${mouth}`);
const specialFaces = [';)'];
faces.push(...specialFaces);

const numkins = 20;

class Pumpkin extends Animator {
  constructor(...args) {
    super(...args);

    this.makePumpkin = this.makePumpkin.bind(this);
  }

  init() {
    this.pumpkins = new Array(numkins).fill(true).map(this.makePumpkin);
  }

  makePumpkin(initial = false) {
    const {
      height,
      width,
    } = this.canvas;

    const maxY = initial ? height : -200;

    return {
      position: [randomInt(-5, width), randomInt(-300, maxY)],
      momentum: randomInt(10, 100),
      size: random(0.5, 4),
      fleshColour: randomItem(fleshColours),
      stemColour: randomItem(stemColours),
      face: randomItem(faces),
    };
  }

  loop() {
    this.fillBackground();
    this.drawPumpkins();
  }

  fillBackground() {
    const {
      canvas,
      context,
    } = this;

    context.fillStyle = bgColour;
    context.fillRect(
      0,
      0,
      canvas.width,
      canvas.height,
    );
  }

  drawPumpkins() {
    this.pumpkins.forEach(this.drawPumpkin.bind(this));
  }

  drawPumpkin(pumpkin, index) {
    const {
      context,
    } = this;

    const {
      position,
      momentum,
      size,
      stemColour,
      fleshColour,
      face,
    } = pumpkin;

    const [x, y] = position;

    context.lineWidth = 2;

    context.fillStyle = stemColour;
    context.beginPath();
    context.moveTo(x - (10 * size), y - (45 * size));
    context.lineTo(x - (5 * size), y - (60 * size));
    context.lineTo(x + (5 * size), y - (60 * size));
    context.lineTo(x + (10 * size), y - (45 * size));
    context.fill();
    context.stroke();
    context.closePath();

    context.fillStyle = fleshColour;
    context.beginPath();
    context.arc(x, y, 50 * size, 0, Math.PI * 2, true);
    context.fill();
    context.stroke();
    context.closePath();

    context.textAlign = 'center';
    context.fillStyle = '#000000';
    context.font = `${30 * size}px Arial`;
    context.fillText(face, x, y + 7 * size);

    pumpkin.position[1] += momentum * this.scalar;

    if (pumpkin.position[1] > this.canvas.height + 300) {
      this.pumpkins.splice(index, 1, this.makePumpkin());
    }
  }
}

export default Pumpkin;
