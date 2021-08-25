export default function blank(obj) {
  /*
   * Checks if obj is blank
   * Conditions:
   *  obj === null
   *  obj === undefined
   *  obj is array or string and length === 0 (obj === [] or obj === '')
   *  obj is object and has no keys (obj === {})
   */
  const type = typeof obj;
  if ([null, undefined].includes(obj)) {
    return true;
  } if (obj instanceof Array || type === 'string') {
    return obj.length === 0;
  } if (type === 'object') {
    return Object.keys(obj).length === 0;
  }
  return false;
}
