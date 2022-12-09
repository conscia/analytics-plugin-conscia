// eslint-disable-next-line no-undef
module.exports = {
  ignorePatterns: ['dist/*.js'],
  overrides: [{
    // Typescript lint rules for src files
    files: 'src/**/*.ts',
    plugins: [
      '@typescript-eslint'
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
  }, {
    // Jest-specific lint rules for test files
    files: 'test/**/*.js',
    plugins: [
      'jest'
    ],
    extends: [
      'eslint:recommended',
      'plugin:jest/recommended',
    ],
    env: {
      'jest/globals': true,
      node: true,
      es6: true
    },
    parserOptions: {
      ecmaVersion: 8
    }
  }],
};