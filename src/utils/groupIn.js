const groupIn = (array, count) => (
  array.reduce((result, value, index) => {
    // If index is multiple of count
    if (index % count === 0) {
      // Create new group
      result.push([]);
    }
    // Push value to current working group (Last group)
    result[result.length - 1].push(value);
    return result;
  }, [])
);

export default groupIn;
