import { jest } from '@jest/globals'

const { LocalStorageManager } = await import('../src/local_storage_manager.js')

describe('LocalStorageManager', () => {
  afterEach(() => {
    window.localStorage.clear()
    jest.resetAllMocks()
  })

  describe('constructor', () => {
    it('Does nothing', async () => {
      expect(new LocalStorageManager()).toMatchObject({})
    })
  })

  describe('getBestScore()', () => {
    it('Gets the score from local storage', async () => {
      window.localStorage.setItem('bestScore', '8')

      expect(LocalStorageManager.getBestScore()).toEqual(8)
    })

    it('Gets the default score from local storage', async () => {
      window.localStorage.removeItem('bestScore')

      expect(LocalStorageManager.getBestScore()).toEqual(0)
    })
  })

  describe('getGameState()', () => {
    it('Gets the game state from local storage', async () => {
      window.localStorage.setItem('gameState', '{"score":8}')

      expect(LocalStorageManager.getGameState()).toEqual({ score: 8 })
    })

    it('Gets the default game state from local storage', async () => {
      window.localStorage.removeItem('gameState')

      expect(LocalStorageManager.getGameState()).toEqual(null)
    })
  })

  describe('clearGameState()', () => {
    it('Clears the game state in local storage', async () => {
      window.localStorage.setItem('gameState', '{"score":8}')

      LocalStorageManager.clearGameState()

      expect(LocalStorageManager.getGameState()).toEqual(null)
    })
  })
})
