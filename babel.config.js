/* eslint-disable func-names */
module.exports = function(api) {
  api.cache(true)
  return {
    presets: ['@babel/preset-env', '@babel/preset-react', '@emotion/babel-preset-css-prop'],
    plugins: [
      ['emotion', { sourceMap: false }],
      ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
      '@babel/plugin-transform-runtime',
      '@babel/plugin-proposal-class-properties',
    ],
    env: {
      test: {
        presets: ['@babel/preset-env', '@babel/preset-react', '@emotion/babel-preset-css-prop'],
        plugins: [
          ['emotion', { sourceMap: false }],
          ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
          '@babel/plugin-transform-runtime',
          '@babel/plugin-proposal-class-properties',
        ],
      },
    },
  }
}
