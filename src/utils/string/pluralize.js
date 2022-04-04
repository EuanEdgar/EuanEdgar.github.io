const pluralize = (a, b, c) => {
  let word; let plural; let count;
  if (!isString(a)) {
    throw new TypeError('First parameter must be of type "string"');
  } else {
    word = a;
  }

  if (isString(b)) {
    plural = b;

    if (isNumber(c)) {
      count = c;
    } else {
      throw new TypeError('You must provide an item count of type "number" as the second or third argument');
    }
  } else if (isNumber(b)) {
    count = b;
    plural = `${word}s`;
  } else {
    throw new TypeError('You must provide an item count of type "number" as the second or third argument');
  }

  if (Math.abs(count) === 1) {
    return word;
  }
  return plural;
};

const isString = (v) => (
  typeof v === 'string' || v instanceof String
);

const isNumber = (v) => (
  typeof v === 'number' || v instanceof Number
);

export default pluralize;
