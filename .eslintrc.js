module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'class-methods-use-this': 0,
    'import/extensions': 0,
    'max-len': 0,
    'new-cap': 0,
    'no-await-in-loop': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-empty': [2, { allowEmptyCatch: true }],
    'no-param-reassign': ['error', { props: false }],
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
    'no-restricted-globals': 0,
    'no-shadow': 0,
    'no-use-before-define': 0,
    'prefer-destructuring': [2, {
      AssignmentExpression: {
        array: false,
        object: false,
      },
    }],
  },
};
