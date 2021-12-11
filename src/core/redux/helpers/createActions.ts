import { fromPairs, identity } from 'ramda'

import {
  DEFAULT_LOAD_NAME,
  DEFAULT_UPDATE_NAME,
  DEFAULT_REMOVE_NAME,
  capitalize,
  upperSnakeCase,
} from '../../utils/helpers/quarks'
import { Params } from '../types'

export type Action = {
  type: string
}

export const resolveActionNaming = ({
  valueKey,
  loadName = DEFAULT_LOAD_NAME,
  updateName = DEFAULT_UPDATE_NAME,
  removeName = DEFAULT_REMOVE_NAME,
}: Record<string, string>): Record<string, string> => ({
  // action type or type suffices
  // Load
  actionLoad: `${loadName}${capitalize(valueKey)}`,
  actionLoaded: `${valueKey}DataLoaded`,
  actionLoadError: `${valueKey}LoadError`,
  // Update
  actionUpdate: `${updateName}${capitalize(valueKey)}`,
  actionUpdated: `${valueKey}Updated`,
  actionUpdateError: `${valueKey}UpdateError`,
  // Remove
  actionRemove: `${removeName}${capitalize(valueKey)}`,
  actionRemoved: `${valueKey}Removed`,
  actionRemoveError: `${valueKey}RemoveError`,
})

// TODO generalize, for actions, reducers, states/selectors
export const resolveStateNaming = ({ valueKey }: { valueKey: string }): Record<string, string> => ({
  // load
  loaded: `${valueKey}Loaded`,
  loading: `${valueKey}Loading`,
  loadError: `${valueKey}LoadError`,
  // update
  updated: `${valueKey}Updated`,
  updating: `${valueKey}Updating`,
  updateError: `${valueKey}UpdateError`,
  // remove
  removed: `${valueKey}Removed`,
  removing: `${valueKey}Removing`,
  removeError: `${valueKey}RemoveError`,
})

export const resolveNaming = ({ valueKey, loadName = DEFAULT_LOAD_NAME }: { valueKey: string; loadName: string }) => ({
  ...resolveActionNaming({ valueKey, loadName }),
  ...resolveStateNaming({ valueKey }),
})

export const actionType = (path: string | string[], key: string) => {
  const prefix = Array.isArray(path) ? path.join(' ') : path
  const type = upperSnakeCase(`${prefix} ${key}`)
  return type
}

export type ActionCreator = {
  type: string
  toString: () => string
}

// TODO simple action creator, merge with createActionCreator ...
export const actionCreatorFactory
= (
  type: string, paramName: string | null, paramsResolver: (...args: Params) => void, path: string | string[] = '',
): ActionCreator => {
  const upperActionType = actionType(path, type)
  const creator = (...params: Params) => {
    const normalizedParams = params
      && Array.isArray(params)
      && params.length === 1
      ? params[0]
      : params

    let action: Record<string, unknown> = {
      type: upperActionType,
    }
    if (paramsResolver) {
      action = {
        ...action,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ...paramsResolver(...params),
      }
    } else if (paramName) {
      action[paramName] = normalizedParams
    }
    return action
  }
  creator.type = upperActionType
  Object.defineProperty(creator, 'name', { value: type, configurable: true })
  creator.toString = function toString () {
    return this.type
  }
  return creator
}

const createActionCreator = (
  { type, paramsResolver = identity, path = '' }:
  { type: string; paramsResolver?: <T>(a: T) => T; path: string | string[] },
): ActionCreator => (
  actionCreatorFactory(type, null, paramsResolver, path)
)

type ActaionCreaterParams = {
  valueKey: string
  typeParamsResolverMap: Record<string, <T>(a: T) => T>
  loadName: string
  path: string | string[]
}

export const createActions = ({
  valueKey,
  typeParamsResolverMap = {},
  loadName = DEFAULT_LOAD_NAME,
  path,
}: ActaionCreaterParams) => {
  const actionTypes = resolveActionNaming({ valueKey, loadName })
  const actionCreators: [string, ActionCreator][] = Object.values(actionTypes).map((type) => (
    [type, createActionCreator({ type, paramsResolver: typeParamsResolverMap[type], path })]
  ))
  const actionCreatorsByType = actionCreators.map(([, creator]) => ([creator.type, creator]))
  const actions = fromPairs(actionCreators)
  return {
    ...actions,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ...fromPairs(actionCreatorsByType),
  }
}

export const actionNames = (actions: Record<string, Action>): string[] => Object.keys(actions)
export const actionTypes
= (actions: Record<string, Action>): string[] => Object.values(actions).map(({ type }:{ type: string }) => type)

export const actionDataTemplate = (data: unknown) => ({ data })
export const actionErrorTemplate = (error: unknown) => ({ error })
