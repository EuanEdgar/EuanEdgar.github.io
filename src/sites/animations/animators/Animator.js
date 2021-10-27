class Animator {
  static contextType = '2d';

  constructor({ canvas, context }) {
    this.canvas = canvas;
    this.context = context;
  }

  init() {
    // Do nothing
  }

  async start() {
    await this.init();

    let lastStamp;

    let done;
    do {
      const timestamp = await new Promise((s) => requestAnimationFrame(s));

      if (lastStamp) {
        const elapsed = timestamp - lastStamp;

        this.scalar = 1 / elapsed;

        done = await this.loop();
      }

      lastStamp = timestamp;
    } while (!done && !this.haltAnimation);
  }

  stop() {
    this.haltAnimation = true;
  }
}

export default Animator;
