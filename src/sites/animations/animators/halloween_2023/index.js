import Animator from '../Animator';

import Pumpkin from './Pumpkin';

const bgColour = '#111111';

class Halloween2023 extends Animator {
  init() {
    this.pumpkins = [];

    this.canvas.addEventListener('click', (e) => {
      this.spawnPumpkin(e.clientX, e.clientY);
    });
  }

  loop() {
    this.fillBackground();

    this.pumpkins.forEach((pumpkin) => {
      pumpkin.step(this.scalar);
      pumpkin.draw(this.context, this.canvas);
    });

    if (this.pumpkins.length === 0) {
      this.drawInstructions();
    }
  }

  spawnPumpkin(x = Math.round(this.canvas.width / 2), y = Math.round(this.canvas.height / 2)) {
    this.pumpkins.push(new Pumpkin({
      x,
      y,
      canvas: this.canvas,
    }));
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

  drawInstructions() {
    const {
      context,
      canvas,
    } = this;

    context.fillStyle = '#ffffff';
    context.textAlign = 'center';
    context.font = '50px sans-serif';
    context.fillText('Click to place a pumpkin', canvas.width / 2, canvas.height / 2);
  }
}

export default Halloween2023;
