import babelPlugin from 'rollup-plugin-babel'
import resolvePlugin from 'rollup-plugin-node-resolve'
import commonjsPlugin from 'rollup-plugin-commonjs'
import jsonPlugin from 'rollup-plugin-json'

// import pkg from './package.json'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

const commonConfig = {
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
    'ramda',
    'lodash-es',
  ],
  watch: {
    include: 'src/**',
  },
}

export default [
  {
    input: ['src/index.ts'],
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
    ...commonConfig,
  },
  {
    input: ['src/core/redux/index.ts'],
    output: [
      {
        dir: 'dist/redux',
        format: 'cjs',
        sourcemap: true,
      },
      {
        dir: 'dist/redux/esm',
        format: 'es',
        sourcemap: true,
      },
    ],
    ...commonConfig,
  },
  {
    input: ['src/core/utils/index.ts'],
    output: [
      {
        dir: 'dist/utils',
        format: 'cjs',
        sourcemap: true,
      },
      {
        dir: 'dist/utils/esm',
        format: 'es',
        sourcemap: true,
      },
    ],
    ...commonConfig,
  },
]
