const runOnce = (fn, defaultVal) => {
  let hasRun = false;
  return (...args) => {
    if (hasRun) {
      return defaultVal;
    }
    hasRun = true;
    return fn(...args);
  };
};

module.exports = runOnce;
