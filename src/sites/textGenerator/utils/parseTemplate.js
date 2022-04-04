const parseToken = (token) => {
  const {
    groups: {
      name,
      type,
      field,
      options: optionString,
    },
  } = /((?<name>\w+)#)?(?<type>\w+)(\.(?<field>\w+))?( (?<options>.*))?/.exec(token);

  let escapeNext = false;
  const optionTokens = optionString.split('').reduce((tokens, character) => {
    let token = tokens.splice(-1, 1)[0];

    const escape = escapeNext;
    escapeNext = false;

    switch (character) {
      case '\\': {
        if (escape) {
          token += character;
        } else {
          escapeNext = true;
        }
        break;
      }
      case ' ': {
        if (escape) {
          token += character;
        } else {
          tokens.push(token);
          token = '';
        }
        break;
      }
      default: {
        token += character;
      }
    }

    return [...tokens, token];
  }, ['']).slice(0, -1);

  while (optionTokens.includes('=')) {
    const index = optionTokens.indexOf('=');

    const left = optionTokens[index - 1];
    const right = optionTokens[index + 1];

    optionTokens.splice(index - 1, 3, { [left]: right });
  }

  const options = optionTokens.reduce((options, token) => {
    if (typeof token === 'object') {
      return {
        ...options,
        ...token,
      };
    }
    return {
      ...options,
      [token]: true,
    };
  }, {});

  return {
    name,
    type,
    field,
    options,
  };
};

const parseTemplate = (template, fn) => {
  const data = {};

  return template.replace(/{(.*?)}/g, (_, content) => {
    const token = parseToken(content);

    return fn(token, data);
  });
};

export default parseTemplate;
