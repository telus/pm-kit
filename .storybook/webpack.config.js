//.storybook/webpack.config.js
module.exports = webpack => {
  const { config } = webpack
  const jsRule = config.module.rules.find(rule => {
    return String(rule.test) === String(/\.(mjs|jsx?)$/)
  })
  jsRule.exclude = /node_modules/
  return config
}
