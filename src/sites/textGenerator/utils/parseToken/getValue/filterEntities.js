const filterEntities = (list, options) => {
  const {
    filters,
    distinct,
  } = options;

  const filteredList = Object.entries(filters).reduce((list, [key, value]) => (
    list.filter((entry) => (
      (entry[key] === value)
    ))
  ), list);

  const distinctList = distinct.reduce((list, { field, value }) => (
    list.filter((entry) => (
      entry[field].toString() !== value
    ))
  ), filteredList);

  if (!distinctList.length) {
    return filteredList;
  }

  return distinctList;
};

export default filterEntities;
