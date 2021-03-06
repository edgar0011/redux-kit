import { capitalize, capitalize2, upperSnakeCase, camelCase } from './quarks'

describe('capialize', () => {
  it('should capitalize words', () => {
    expect(capitalize('hello')).toEqual('Hello')
  })

  it('should capitalize words, correctly', () => {
    expect(capitalize('aaBbAaBAbABAB')).toEqual('AaBbAaBAbABAB')
  })

  it('should capitalize words, more then forst letter', () => {
    expect(capitalize('aaBbAaBAbABAB', 4)).toEqual('AABBAaBAbABAB')
  })
})

describe('capitalize2', () => {
  it('should capitalize2 words', () => {
    expect(capitalize2('hello')).toEqual('Hello')
  })
})
describe('upperSnakeCase', () => {
  it('should upperSnakeCase words', () => {
    expect(upperSnakeCase('hello world')).toEqual('HELLO_WORLD')
  })
})

describe('camelCase', () => {
  it('should camelCase words', () => {
    expect(camelCase(['hello', 'world'])).toEqual('helloWorld')
  })

  it('should camelCase words', () => {
    expect(camelCase(['', 'world'])).toEqual('world')
  })

  it('should camelCase words', () => {
    expect(camelCase(['hi yes', 'no', 'world'])).toEqual('hiYesNoWorld')
  })
})
