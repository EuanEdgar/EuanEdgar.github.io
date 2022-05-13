import tokenize from './tokenize';
import parseToken2 from './parseToken';

const parseToken = (token) => {
  const {
    groups: {
      name,
      type,
      field,
      options: optionString = '',
    },
  } = /((?<name>\w+)#)?(?<type>\w+)(\.(?<field>\w+))?( (?<options>.*))?$/.exec(token);

  const optionTokens = tokenize(optionString, { splitOn: ' ' })
    .filter(({ value }) => value.trim())
    .map(({ value }) => value);

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

const parseTemplate = (template, data = {}) => {
  const parts = tokenize(template, {
    startToken: ({ trigger, character }) => {
      if (trigger === '{') {
        return { type: 'token', value: character };
      }
      return { type: 'text', value: character };
    },
  });

  return parts.filter(({ value }) => value).map((token) => {
    if (token.type === 'text') {
      return token.value;
    }
    return parseToken2(parseToken(token.value.trim()), data, { parseTemplate });
  }).join('');
};

export default parseTemplate;
