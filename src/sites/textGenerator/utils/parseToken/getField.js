const getField = (object, field) => (
  (typeof object === 'object')
    ? object[field || 'value']
    : object
);

export default getField;
