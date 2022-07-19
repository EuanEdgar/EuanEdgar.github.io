const getDimensions = ({ container, size }) => ({
  x: Math.floor(container.clientWidth / size),
  y: Math.floor(container.clientHeight / size),
});

export default getDimensions;
