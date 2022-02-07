export const reduceSum = (s, c) => s + c;

const sum = (nums) => (
  nums.reduce(reduceSum)
);

export default sum;
