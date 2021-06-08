module.exports = {
  extends: ['standard'],
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 12
  },
  plugins: ['@typescript-eslint']
}
