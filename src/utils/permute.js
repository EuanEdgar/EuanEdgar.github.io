const permute = (a, b) => a.map((ia) => (
  b.map((ib) => (
    [ia, ib]
  ))
)).flat(1);

export default permute;
