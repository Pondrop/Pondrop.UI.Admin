module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended'],
  parserOptions: { ecmaVersion: 2018, sourceType: 'module' },
  rules: {
    // Insert any relevant lint rules here
    // You may refer to the link below for the list of rules
    // https://eslint.org/docs/latest/rules/
    'no-console': 'warn',
    'no-duplicate-imports': 'warn',
    'no-use-before-define': 'warn',
    'default-case': 'warn',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-spread': 'error',
  },
};
