import randomNumber from '@/utils/random';
import randomItem from '@/utils/random/item';
import permute from '@/utils/permute';

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

class Pumpkin {
  constructor({ x, y, canvas }) {
    this.x = x;
    this.y = y;

    this.size = 200;
    this.momentumX = (canvas.width / 2 - x) / 1;
    this.momentumY = (canvas.height / 2 - y) / 1;
    this.momentumSpin = 0.5;
    this.rotation = 0;
    this.mass = randomNumber(0.2, 5);

    this.stemColour = randomItem(stemColours);
    this.fleshColour = randomItem(fleshColours);
    this.face = randomItem(faces);

    this.canvas = canvas;
  }

  step(deltaTime) {
    this.applyGravity(deltaTime);
    this.move(deltaTime);
    this.bounce();
    this.rotate();
  }

  applyGravity(deltaTime) {
    const { mass } = this;
    this.momentumY += 200 * mass * deltaTime;
  }

  move(deltaTime) {
    const {
      momentumX,
      momentumY,
    } = this;

    this.x += momentumX * deltaTime;
    this.y += momentumY * deltaTime;
  }

  bounce() {
    const {
      size,
      x,
      y,
    } = this;

    const distanceToEdge = size / 2;
    const leftEdge = x - distanceToEdge;
    const rightEdge = x + distanceToEdge;
    const bottomEdge = y - distanceToEdge;
    const topEdge = y + distanceToEdge;

    if (rightEdge >= this.canvas.width || leftEdge <= 0) {
      if (rightEdge >= this.canvas.width) {
        this.x = this.canvas.width - distanceToEdge;
        this.momentumSpin += this.momentumY / 10;
      } else if (leftEdge <= 0) {
        this.x = distanceToEdge;
        this.momentumSpin -= this.momentumY / 10;
      }
      this.momentumX *= -0.8;
      this.momentumY *= 0.9;
      this.momentumSpin *= 0.5;
    }

    if (topEdge >= this.canvas.height || bottomEdge <= 0) {
      if (topEdge >= this.canvas.height) {
        this.y = this.canvas.height - distanceToEdge;
        this.momentumSpin -= this.momentumX / 20;
      } else if (bottomEdge <= 0) {
        this.y = distanceToEdge;
        this.momentumSpin += this.momentumX / 20;
      }
      this.momentumY *= -0.8;
      this.momentumX *= 0.9;
      this.momentumSpin *= 0.5;
    }
  }

  rotate() {
    this.rotation += this.momentumSpin;
    this.momentumSpin *= 0.99;
  }

  draw(context) {
    const {
      x,
      y,
      size: realSize,
      rotation,

      fleshColour,
      stemColour,
      face,
    } = this;

    const size = realSize / 100;

    context.lineWidth = 2;

    const rotatePoint = (pX, pY) => {
      const radians = (Math.PI / 180) * rotation;
      const cos = Math.cos(radians);
      const sin = Math.sin(radians);
      const nx = (cos * (pX - x)) + (sin * (pY - y)) + x;
      const ny = (cos * (pY - y)) - (sin * (pX - x)) + y;
      return [nx, ny];
    };

    const drawStem = () => {
      context.fillStyle = stemColour;
      context.beginPath();
      context.moveTo(...rotatePoint(x - (10 * size), y - (45 * size)));
      context.lineTo(...rotatePoint(x - (5 * size), y - (60 * size)));
      context.lineTo(...rotatePoint(x + (5 * size), y - (60 * size)));
      context.lineTo(...rotatePoint(x + (10 * size), y - (45 * size)));
      context.fill();
      context.stroke();
      context.closePath();
    };

    const drawBody = () => {
      context.fillStyle = fleshColour;
      context.beginPath();
      context.arc(x, y, 50 * size, 0, Math.PI * 2, true);
      context.fill();
      context.stroke();
      context.closePath();
    };

    const drawFace = () => {
      context.textAlign = 'center';
      context.fillStyle = '#000000';
      context.font = `${30 * size}px Arial`;
      context.fillText(face, x, y + 7 * size);
    };

    drawStem();
    drawBody();
    drawFace();
  }
}

export default Pumpkin;
