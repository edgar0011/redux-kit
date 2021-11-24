import babelPlugin from 'rollup-plugin-babel'
import resolvePlugin from 'rollup-plugin-node-resolve'
import commonjsPlugin from 'rollup-plugin-commonjs'
import jsonPlugin from 'rollup-plugin-json'

// import pkg from './package.json'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

export default {
  input: ['src/index.ts', 'src/core/redux/index.js'],
  output: [
    {
      dir: 'dist/lib/cjs',
      format: 'cjs',
      sourcemap: true,
    },
    {
      dir: 'dist/lib/esm',
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
    'lodash-es',
  ],
  watch: {
    include: 'src/**',
  },
}
