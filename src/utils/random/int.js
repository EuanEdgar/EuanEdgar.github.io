import random from '.';

const randomInt = (min, max) => (
  Math.floor(random(min, max + 1))
);

export default randomInt;
