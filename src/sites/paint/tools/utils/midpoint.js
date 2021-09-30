import average from '@/utils/maths/average';

const midpoint = (a, b) => {
  const [x1, y1] = a;
  const [x2, y2] = b;

  const x = average([x1, x2]);
  const y = average([y1, y2]);

  return [x, y];
};

export default midpoint;
