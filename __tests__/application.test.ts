import { jest } from '@jest/globals'

const animFramePolyfill = jest.fn()
const gameManager = jest.fn()

jest.unstable_mockModule('../src/animframe_polyfill.js', () => ({
  animFramePolyfill
}))
jest.unstable_mockModule('../src/game_manager.js', () => {
  class GameManager {
    constructor() {
      return gameManager
    }
  }

  return {
    GameManager
  }
})

describe('Application', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Starts the application', async () => {
    expect(await import('../src/application.js')).toMatchObject({})
  })
})
