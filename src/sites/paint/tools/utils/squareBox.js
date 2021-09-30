const squareBox = (origin, final) => {
  const [x1, y1] = origin;
  const [x2, y2] = final;

  const distX = Math.abs(x1 - x2);
  const distY = Math.abs(y1 - y2);
  const dist = Math.max(distX, distY);

  const moveX = (x1 > x2) ? -dist : dist;
  const moveY = (y1 > y2) ? -dist : dist;

  return [x1 + moveX, y1 + moveY];
};

export default squareBox;
