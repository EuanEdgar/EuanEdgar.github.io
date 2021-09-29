import random from '@/utils/random';
import randomInt from '@/utils/random/int';
import randomItem from '@/utils/random/item';

import Animator from './Animator';

const bgColour = '#000000';
const stemColours = ['#6b4000'];
const fleshColours = ['#ff8c00', '#ffffff'];
const faces = [':)', ':]', ':(', ';)'];

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

    const maxY = initial ? height : -100;

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

    context.fillStyle = stemColour;
    context.beginPath();
    context.moveTo(x - (10 * size), y - (45 * size));
    context.lineTo(x - (5 * size), y - (60 * size));
    context.lineTo(x + (5 * size), y - (60 * size));
    context.lineTo(x + (10 * size), y - (45 * size));
    context.fill();
    context.closePath();

    context.fillStyle = fleshColour;
    context.beginPath();
    context.arc(x, y, 50 * size, 0, Math.PI * 2, true);
    context.fill();
    context.closePath();

    context.fillStyle = '#000000';
    context.font = `${30 * size}px Arial`;
    context.fillText(face, x - 10 * size, y + 5 * size);

    pumpkin.position[1] += momentum * this.scalar;

    if (pumpkin.position[1] > this.canvas.height + 300) {
      this.pumpkins.splice(index, 1, this.makePumpkin());
    }
  }
}

export default Pumpkin;
