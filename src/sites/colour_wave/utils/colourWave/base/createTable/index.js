import getDimensions from './getDimensions';
import createTable from './createTable';

export default ({ size = 50, container }) => {
  const dimensions = getDimensions({ container, size });
  return createTable({ ...dimensions, container });
};
