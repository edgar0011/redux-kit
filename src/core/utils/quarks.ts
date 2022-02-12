import {
  replace, head, toUpper, concat, tail, pipe,
} from 'ramda'
import snakeCase from 'lodash-es/snakeCase'

export const DEFAULT_LOAD_NAME = 'load'
export const DEFAULT_UPDATE_NAME = 'update'
export const DEFAULT_REMOVE_NAME = 'remove'
export const DEFAULT_ACTON_PAYLOAD_NAME = 'payload'

export const capitalize = (string: string) => {
  if (!string) {
    return ''
  }
  const firstLetter = head(string)
  return replace(firstLetter, toUpper(firstLetter), string)
}

export const capitalize2 = (string: string) => (!string ? '' : concat(
  toUpper(head(string)), tail(string),
))

export const upperSnakeCase = pipe(
  snakeCase,
  toUpper,
)
