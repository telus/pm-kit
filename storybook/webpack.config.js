const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin')

module.exports = async webpack => {
  const { config } = webpack

  // for MDX docs
  config.module.rules.push({
    test: /\.(stories|story)\.mdx$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          plugins: ['@babel/plugin-transform-react-jsx'],
        },
      },
      {
        loader: '@mdx-js/loader',
        options: {
          compilers: [createCompiler({})],
        },
      },
    ],
  })

  // for @storybook/addon-storysource
  config.module.rules.unshift({
    test: /\.(stories|story)\.jsx?$/,
    loader: require.resolve('@storybook/source-loader'),
    exclude: [/node_modules/],
    enforce: 'pre',
  })

  // for ignoring packages' node_modules
  const jsRule = config.module.rules.find(rule => {
    return String(rule.test) === String(/\.(mjs|jsx?)$/)
  })
  jsRule.exclude = /node_modules/

  return config
}
