const filterEntities = (list, options) => {
  const {
    settings,
    distinct,
  } = options;

  const filteredList = Object.entries(settings).reduce((list, [key, value]) => (
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
