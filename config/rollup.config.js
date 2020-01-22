import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import babel from 'rollup-plugin-babel'
import image from '@rollup/plugin-image'
import url from '@rollup/plugin-url'
import autoprefixer from 'autoprefixer'

import cleaner from './rollup-plugin-cleaner'

export default opts => {
  const options = Object.assign(
    {
      css: false,
    },
    opts
  )

  const pmKitExternals = options.dependencies
    ? Object.keys(options.dependencies).filter(dependency => dependency.startsWith('@pm-kit'))
    : []

  return {
    input: options.input,
    output: [
      { format: 'cjs', file: './dist/index.cjs.js', sourcemap: false },
      { format: 'es', file: './dist/index.es.js', sourcemap: false },
    ],

    external: ['react', 'react-dom', 'prop-types', '@emotion/core'].concat(pmKitExternals),

    plugins: [
      cleaner({
        targets: ['./dist/'],
      }),
      image(),
      nodeResolve({
        extensions: ['.js', '.jsx'],
        browser: true,
      }),
      commonjs({
        include: /node_modules/,
      }),
      options.css &&
        postcss({
          extract: './dist/index.css',
          sourceMap: false,
          plugins: [autoprefixer()],
        }),
      babel({
        runtimeHelpers: true,
        exclude: '../../node_modules/**',
        configFile: '../../babel.config.js',
      }),
      url({
        include: ['**/*.woff', '**/*.woff2'],
        limit: Infinity,
      }),
    ],
  }
}
