import randomItem from '@/utils/random/item';
import createTable from './createTable';

const fn = (container) => {
  const { grid } = createTable({ container });

  const getColour = randomItem([
    (a, b) => `#${a}${b}00`,
    (a, b) => `#${a}00${b}`,
    (a, b) => `#00${a}${b}`,
  ]);

  let rotation = 0;
  const fn = () => {
    grid.forEach((row, rowNum, { length: rowCount }) => {
      row.forEach((cell, colNum, { length: colCount }) => {
        const cy = Math.floor((([0, 3].includes(rotation) ? rowNum : rowCount - rowNum) / rowCount) * 255);
        const cx = Math.floor((([0, 1].includes(rotation) ? colCount - colNum : colNum) / colCount) * 255);

        const colour = getColour(padColour(cy.toString(16), 2), padColour(cx.toString(16), 2));
        cell.style.backgroundColor = colour;
      });
    });

    rotation += 1;
    if (rotation > 3) {
      rotation = 0;
    }
  };

  setInterval(fn, 500);
};

function padColour(c, n = 6) {
  // eslint-disable-next-line no-param-reassign
  c = c.toString();
  while (c.length < n) {
    // eslint-disable-next-line no-param-reassign
    c = `0${c}`;
  }
  return c;
}

export default fn;
