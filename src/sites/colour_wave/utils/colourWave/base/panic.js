import createTable from './createTable';
import generateColour from './utils/generateColour';

const fn = (container) => {
  const { grid } = createTable({ container });

  const fn = () => {
    grid.forEach((row) => {
      row.forEach((cell) => {
        cell.style.backgroundColor = generateColour();
      });
    });
  };

  setInterval(fn, 1000);
};

export default fn;
