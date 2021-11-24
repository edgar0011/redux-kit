import { memoizeWith, identity } from 'ramda'

export const memoize = memoizeWith(identity)

// Beware fellow developer, this is to be used with caution and precison
export const memoizeComplex = memoizeWith((...args) => JSON.stringify(args))
