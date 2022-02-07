import randomInt from './int';

const randomItem = (array) => (
  (array.length && array[randomInt(0, array.length - 1)]) || undefined
);

export default randomItem;
