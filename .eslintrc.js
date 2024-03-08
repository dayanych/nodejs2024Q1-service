module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'test'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'semi-spacing': ['error', { 'before': false, 'after': true }],
    'array-bracket-newline': ['error', { 'multiline': true }],
    'semi': ['error', 'always'],
    'semi-style': ['error', 'last'],
    'eol-last': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'no-trailing-spaces': 'error'
  },
};
