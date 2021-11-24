import {
  replace, head, toUpper, concat, tail, pipe,
} from 'ramda'
import { snakeCase } from 'lodash-es'

export const DEFAULT_LOAD_NAME = 'load'

export const capitalize = (string) => {
  if (!string) {
    return ''
  }
  const firstLetter = head(string)
  return replace(firstLetter, toUpper(firstLetter), string)
}

export const capitalize2 = (string) => (!string ? '' : concat(
  toUpper(head(string)), tail(string),
))

export const upperSnakeCase = pipe(
  snakeCase,
  toUpper,
)
