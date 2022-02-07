const transferItems = (a1, a2, n) => {
  let count = 0;
  while (a1.length && count < n) {
    a2.push(a1.pop());
    count += 1;
  }
  return count;
};

export default transferItems;
