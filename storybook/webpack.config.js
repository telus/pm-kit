//.storybook/webpack.config.js
module.exports = async webpack => {
  const { config } = webpack

  // for @storybook/addon-storysource
  config.module.rules.unshift({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('@storybook/source-loader')],
    enforce: 'pre',
  })

  // for ignoring packages' node_modules
  const jsRule = config.module.rules.find(rule => {
    return String(rule.test) === String(/\.(mjs|jsx?)$/)
  })
  jsRule.exclude = /node_modules/

  return config
}
