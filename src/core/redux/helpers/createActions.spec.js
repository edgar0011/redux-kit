/* eslint-disable no-console */
import {
  createActions, createActionCreator, actionCreatorFactory,
  resolveActionNaming, resolveStateNaming,
} from './createActions'

describe('createActions helper', () => {
  it('should create simple `data` action and Co.', () => {
    const actions = createActions({
      valueKey: 'user',
      typeParamsResolverMap: {
        loadUser: (params) => ({ actionLoadUserParams: params }),
      },
    })

    // console.log(actions)
    // console.log(Object.keys(actions))
    // console.log(Object.values(actions).map(({ type }) => type))
    // console.log(actions.loadUser)

    expect(actions.user).toBeDefined()
    expect(actions.user.name).toEqual('user')
    expect(actions.user.type).toEqual('USER')
    expect(actions.user).toEqual(actions.USER)

    console.log(actions.user({ userName: 'Karel' }))

    expect(actions.loadUser).toBeDefined()
    expect(actions.loadUser.name).toEqual('loadUser')
    expect(actions.loadUser.type).toEqual('LOAD_USER')
    expect(actions.loadUser).toEqual(actions.LOAD_USER)

    console.log(actions.loadUser.toString())
    console.log(actions.loadUser('token'))

    expect(actions.loadUser('token').actionLoadUserParams).toEqual('token')

    expect(actions.userDataLoaded).toBeDefined()
    expect(actions.userLoadError).toBeDefined()
    expect(actions.userLoadError).toEqual(actions.USER_LOAD_ERROR)

    expect(`${actions.loadUser}`).toEqual('LOAD_USER')
    expect(`${actions.userDataLoaded}`).toEqual('USER_DATA_LOADED')
  })

  it('should create loadItems actions and Co.', () => {
    const actions = createActions({
      valueKey: 'items',
      typeParamsResolverMap: {
        loadItems: (params) => ({ actionLoadItemsParams: params }),
      },
      path: 'search',
    })

    console.log(actions)
    console.log(actions.loadItems)
    console.log(actions.loadItems.name)
    console.log(actions.loadItems.type)
    console.log(actions.loadItems.toString())

    console.log(actions.SEARCH_LOAD_ITEMS)

    expect(actions.loadItems).toBeDefined()
    expect(actions.loadItems.name).toEqual('loadItems')
    expect(actions.loadItems.toString()).toEqual(actions.loadItems.type)
    expect(actions.loadItems.type).toEqual('SEARCH_LOAD_ITEMS')
    expect(`${actions.loadItems}`).toEqual('SEARCH_LOAD_ITEMS')
    expect(actions.loadItems).toEqual(actions.SEARCH_LOAD_ITEMS)

    expect(actions.loadItems({ payload: 'token' }).actionLoadItemsParams).toEqual({ payload: 'token' })

    expect(actions.itemsDataLoaded).toBeDefined()
    expect(actions.itemsLoadError).toBeDefined()
  })

  it('should create loadPost actions and Co.', () => {
    const actions = createActions({
      valueKey: 'posts',
      typeParamsResolverMap: {
        loadPosts: (params) => ({ actionLoadPostsParams: params }),
      },
      path: '',
    })

    console.log(actions)
    console.log(actions.loadPosts)
    console.log(actions.loadPosts.name)
    console.log(actions.loadPosts.type)
    console.log(actions.loadPosts.toString())

    console.log(actions.LOAD_ITEMS)

    expect(actions.loadPosts).toBeDefined()
    expect(actions.loadPosts.name).toEqual('loadPosts')
    expect(actions.loadPosts.toString()).toEqual(actions.loadPosts.type)
    expect(actions.loadPosts.type).toEqual('LOAD_POSTS')
    expect(`${actions.loadPosts}`).toEqual('LOAD_POSTS')
    expect(actions.loadPosts).toEqual(actions.LOAD_POSTS)

    expect(actions.loadPosts({ payload: 'token' }).actionLoadPostsParams).toEqual({ payload: 'token' })

    expect(actions.postsDataLoaded).toBeDefined()
    expect(actions.postsLoadError).toBeDefined()
  })
  it('should create loadSearch actions and Co. from search', () => {
    const actions = createActions({
      valueKey: 'search',
      typeParamsResolverMap: {
        loadSearch: (params) => ({ searchParams: params }),
      },
    })

    // console.log(actions)
    // console.log(actions.loadSearch)

    // console.log({
    //   [actions.loadSearch]: 'hello',
    // })

    expect(actions.loadSearch).toBeDefined()
    expect(actions.loadSearch.name).toEqual('loadSearch')
    expect(actions.loadSearch.type).toEqual('LOAD_SEARCH')

    expect(actions.loadSearch({ payload: 'token' }).searchParams).toEqual({ payload: 'token' })

    expect(actions.searchDataLoaded).toBeDefined()
    expect(actions.searchLoadError).toBeDefined()

    expect(`${actions.loadSearch}`).toEqual('LOAD_SEARCH')
  })

  it('should test actionCreateFactory', () => {
    const loadHome = actionCreatorFactory('loadHome')
    const homeLoaded = actionCreatorFactory('homeLoaded', 'data')
    const homeLoadFailed = actionCreatorFactory(
      'homeLoadFailed', null, (error) => ({ thisIsError: error }),
    )
    const homeLoadFailed2 = createActionCreator({
      type: 'homeLoadFailed', paramName: 'error',
    })

    console.log('loadHome', loadHome)
    console.log('homeLoaded', homeLoaded)
    console.log('homeLoadFailed', homeLoadFailed)

    console.log("homeLoadFaile2d('jako ze error')")
    console.log(homeLoadFailed2('jako ze error'))

    expect(homeLoaded(['result1', 'result2'])).toEqual({ type: 'HOME_LOADED', data: ['result1', 'result2'] })
    expect(homeLoadFailed('jako ze error')).toEqual({ type: 'HOME_LOAD_FAILED', thisIsError: 'jako ze error' })
    expect(homeLoadFailed2('jako ze error')).toEqual({ type: 'HOME_LOAD_FAILED', error: 'jako ze error' })
  })

  it('shoudl test naming', (done) => {
    const naming = resolveActionNaming({ valueKey: 'posts' })
    const stateNaming = resolveStateNaming({ valueKey: 'posts' })

    console.log(naming)
    console.log(stateNaming)

    expect(naming.actionLoad).toEqual('loadPosts')
    expect(naming.actionLoaded).toEqual('postsDataLoaded')

    done()
  })
})
