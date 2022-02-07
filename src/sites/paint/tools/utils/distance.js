const distance = (start, end) => {
  const [x1, y1] = start;
  const [x2, y2] = end;

  const distX = Math.abs(x1 - x2);
  const distY = Math.abs(y1 - y2);

  return Math.sqrt(distX ** 2 + distY ** 2);
};

export default distance;
