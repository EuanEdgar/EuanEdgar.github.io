import repeat from '../utils/repeat';

const createTable = ({ x, y, container }) => {
  const table = document.createElement('table');
  const tableBody = document.createElement('tbody');
  table.appendChild(tableBody);

  const grid = [];

  repeat(y, (y) => {
    const row = document.createElement('tr');
    grid[y] = [];

    repeat(x, (x) => {
      const cell = document.createElement('td');

      row.appendChild(cell);
      grid[y][x] = cell;
    });

    tableBody.appendChild(row);
  });

  container.appendChild(table);

  return {
    table,
    grid,
  };
};

export default createTable;
