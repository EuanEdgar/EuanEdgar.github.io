const inverse = {
  '{': '}',
  '}': '{',
};

const tokenize = (template, {
  startToken = ({ character }) => ({ type: 'text', value: character }),
  splitOn = null,
} = {}) => {
  const parts = [startToken({ character: '' })];
  const stack = [];

  for (let x = 0; x < template.length; x++) {
    const char = template[x];

    if (['"'].includes(char)) {
      if (stack[stack.length - 1] === char) {
        stack.pop();
        if (stack.length === 0) {
          parts.push(startToken({ trigger: char, character: '' }));
        } else {
          parts[parts.length - 1].value += char;
        }
      } else {
        stack.push(char);
        if (stack.length === 1) {
          parts.push(startToken({ trigger: char, character: '' }));
        } else {
          parts[parts.length - 1].value += char;
        }
      }
    } else if (['{'].includes(char)) {
      stack.push(char);
      if (stack.length === 1) {
        parts.push(startToken({ trigger: char, character: '' }));
      } else {
        parts[parts.length - 1].value += char;
      }
    } else if (['}'].includes(char) && stack[stack.length - 1] === inverse[char]) {
      stack.pop();
      if (stack.length === 0) {
        parts.push(startToken({ trigger: char, character: '' }));
      } else {
        parts[parts.length - 1].value += char;
      }
    } else if (char === splitOn && stack.length === 0) {
      parts.push(startToken({ trigger: char, character: '' }));
    } else {
      parts[parts.length - 1].value += char;
    }
  }

  return parts;
};

export default tokenize;
