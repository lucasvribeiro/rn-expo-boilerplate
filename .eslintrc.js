module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  ignorePatterns: ['node_modules', 'app-example/**'],
  rules: {
    'prettier/prettier': 'error'
  }
}
