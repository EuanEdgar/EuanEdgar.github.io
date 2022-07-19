const pad = (s) => {
  while (s.length < 6) {
    // eslint-disable-next-line no-param-reassign
    s = `0${s}`;
  }
  return s;
};

const generateColour = () => (
  `#${pad(Math.floor(Math.random() * 0xffffff + 1).toString(16))}`
);

export default generateColour;
