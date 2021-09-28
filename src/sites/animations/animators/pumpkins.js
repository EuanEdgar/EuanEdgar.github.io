import Animator from './Animator';

const bgColour = '#000000';

const randInt = (min, max) => (
  Math.floor(rand(min, max) - 1)
);

const rand = (min, max) => (
  Math.random() * (max - min) + min
);

const numkins = 20;

class Pumpkin extends Animator {
  constructor(...args) {
    super(...args);

    this.makePumpkin = this.makePumpkin.bind(this);
  }

  init() {
    this.pumpkins = new Array(numkins).fill(null).map(() => this.makePumpkin(true));
  }

  makePumpkin(initial = false) {
    const {
      height,
      width,
    } = this.canvas;

    const maxY = initial ? height : -100;

    return {
      position: [randInt(-5, width), randInt(-300, maxY)],
      momentum: randInt(10, 100),
      size: rand(0.5, 4),
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
    } = pumpkin;

    const [x, y] = position;

    context.fillStyle = '#6b4000';
    context.beginPath();
    context.moveTo(x - (10 * size), y - (45 * size));
    context.lineTo(x - (5 * size), y - (60 * size));
    context.lineTo(x + (5 * size), y - (60 * size));
    context.lineTo(x + (10 * size), y - (45 * size));
    context.fill();
    context.closePath();

    context.fillStyle = '#ff8c00';
    context.beginPath();
    context.arc(x, y, 50 * size, 0, Math.PI * 2, true);
    context.fill();
    context.closePath();

    context.fillStyle = '#000000';
    context.font = `${30 * size}px Arial`;
    context.fillText(':)', x - 10 * size, y + 5 * size);

    pumpkin.position[1] += momentum * this.scalar;

    if (pumpkin.position[1] > this.canvas.height + 300) {
      this.pumpkins.splice(index, 1, this.makePumpkin());
    }
  }
}

export default Pumpkin;
