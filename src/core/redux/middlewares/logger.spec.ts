type Message = {
  from: string
  to: string
  subject: string
  type: number
  text: string
}

type Log = (message: Message) => void
type LogMock = { mock: { calls: number } }

type ILogger = {
  log: Log | LogMock
}

// ----------------------------------------------------------------------

const props: { message: Message } = {
  message: {
    from: 'Karel',
    to: 'Nadezda',
    subject: 'Hello',
    type: 0,
    text: 'This my hello to you, Nadezda. Regards, Karel',
  },
}

const sayHello = (logger: ILogger) => {
  if (typeof logger.log === 'function') {
    logger.log(props.message)
  }
}

// Tests

it('says HELLO', () => {
  const mockLogger: ILogger = {
    log: jest.fn(),
  }

  const mockedCall: void = sayHello(mockLogger)

  console.log(mockedCall)
  console.log('mockedCall')
  console.log(mockLogger.log)
  if (typeof mockLogger.log !== 'function') {
    console.log(mockLogger.log.mock)
    console.log(mockLogger.log.mock.calls)
  }

  expect(mockLogger.log).toHaveBeenCalledWith(props.message)
})
