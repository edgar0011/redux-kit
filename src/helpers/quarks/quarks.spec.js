import { capitalize, capitalize2 } from './index'

describe('capialize', () => {
  it('should capitalize words', () => {
    expect(capitalize('hello')).toEqual('Hello')
  })
})

describe('capitalize2', () => {
  it('should capitalize2 words', () => {
    expect(capitalize2('hello')).toEqual('Hello')
  })
})
