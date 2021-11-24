import babelPlugin from 'rollup-plugin-babel'
import resolvePlugin from 'rollup-plugin-node-resolve'
import commonjsPlugin from 'rollup-plugin-commonjs'
import jsonPlugin from 'rollup-plugin-json'

import pkg from './package.json'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    resolvePlugin({
      extensions,
    }),

    babelPlugin({
      extensions,
      exclude: 'node_modules/**',
    }),
    jsonPlugin(),
    commonjsPlugin(),
  ],
  external: [
    'redux',
    'redux-saga',
    'reselect',
    'react-select',
    'ramda',
    'lodash-es'
  ],
  watch: {
    include: 'src/**',
  },
}
