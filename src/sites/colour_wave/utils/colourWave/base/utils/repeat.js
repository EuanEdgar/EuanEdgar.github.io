const repeat = (n, fn) => {
  for (let x = 0; x < n; x++) {
    fn(x);
  }
};

export default repeat;
