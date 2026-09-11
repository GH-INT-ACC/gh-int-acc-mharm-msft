import { jest } from '@jest/globals'

const animFramePolyfill = jest.fn()
const gameManager = jest.fn()

jest.unstable_mockModule('../src/animframe_polyfill.js', () => ({
  animFramePolyfill
}))
jest.unstable_mockModule('../src/game_manager.js', () => {
  class GameManager {
    constructor(gridSize: number) {
      gameManager(gridSize)
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
    window.requestAnimationFrame = jest.fn((callback) => {
      callback(0)
      return 0 as any
    })

    expect(await import('../src/application.js')).toMatchObject({})
    expect(gameManager).toHaveBeenCalledWith(4)
  })
})
