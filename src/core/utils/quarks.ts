import {
  replace, head, toUpper, concat, tail, pipe,
} from 'ramda'
import snakeCase from 'lodash-es/snakeCase'
import camelCaseLES from 'lodash-es/camelCase'

export const DEFAULT_LOAD_NAME = 'load'
export const DEFAULT_UPDATE_NAME = 'update'
export const DEFAULT_REMOVE_NAME = 'remove'
export const DEFAULT_ACTON_PAYLOAD_NAME = 'payload'

export const capitalize = (value: string, num: number) => {
  if (!value) {
    return ''
  }

  const firstLetter = !num ? head(value) : value.substr(0, num)

  return replace(firstLetter, toUpper(firstLetter), value)
}

export const capitalize2 = (value: string) => (!value ? '' : concat(
  toUpper(head(value)), tail(value),
))

export const upperSnakeCase = pipe(
  snakeCase,
  toUpper,
)

type ValueString = string[] | string

export const camelCase = (value: ValueString): string => camelCaseLES(Array.isArray(value) ? value.join(' ') : value)
