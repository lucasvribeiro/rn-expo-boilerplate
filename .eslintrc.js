module.exports = {
  plugins: ['prettier'],
  extends: ['expo', 'prettier', 'eslint:recommended', 'plugin:prettier/recommended'],
  ignorePatterns: ['node_modules', 'android', 'ios', 'app-example']
}
