const angle = (pointA, pointB, degrees = false) => {
  const [x1, y1] = pointA;
  const [x2, y2] = pointB;

  const distX = x1 - x2;
  const distY = y1 - y2;

  const angle = Math.atan2(distX, distY);

  if (degrees) {
    return angle * (180 / Math.PI); // rads to degs, range (-180, 180]
  }
  return angle;
};

export default angle;
