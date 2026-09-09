import { jest } from '@jest/globals'
import { GameState } from '../src/types.js'

const localStorageManager = jest.fn()
const clearGameState = jest.fn()
const setBestScore = jest.fn()
const getBestScore = jest.fn()
const setGameState = jest.fn()
const keyboardInputManager = jest.fn()
const on = jest.fn()
const htmlActuator = jest.fn()
const actuate = jest.fn()
const continueGame = jest.fn()

jest.unstable_mockModule('../src/local_storage_manager.js', () => {
  class LocalStorageManager {
    constructor() {
      return localStorageManager
    }
    static getBestScore = getBestScore
    static setBestScore = setBestScore
    static clearGameState = clearGameState
    static setGameState = setGameState
  }

  return {
    LocalStorageManager
  }
})
jest.unstable_mockModule('../src/keyboard_input_manager.js', () => {
  class KeyboardInputManager {
    constructor() {
      return keyboardInputManager
    }
    static on = on
  }

  return {
    KeyboardInputManager
  }
})
jest.unstable_mockModule('../src/html_actuator.js', () => {
  class HTMLActuator {
    constructor() {
      return htmlActuator
    }
    static actuate = actuate
    static continueGame = continueGame
  }

  return {
    HTMLActuator
  }
})

const { GameManager } = await import('../src/game_manager.js')

describe('GameManager', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('constructor', () => {
    it('Sets up the game manager', async () => {
      const setup = jest
        .spyOn(GameManager, 'setup')
        .mockImplementation(() => {})

      new GameManager(4)

      expect(GameManager.size).toEqual(4)
      expect(on).toHaveBeenCalledTimes(3)
      expect(setup).toHaveBeenCalledTimes(1)
    })
  })

  describe('restart()', () => {
    it('Restarts the game', () => {
      const setup = jest
        .spyOn(GameManager, 'setup')
        .mockImplementation(() => {})

      GameManager.restart()

      expect(clearGameState).toHaveBeenCalledTimes(1)
      expect(continueGame).toHaveBeenCalledTimes(1)
      expect(setup).toHaveBeenCalledTimes(1)
    })
  })

  describe('keepPlaying()', () => {
    it('Continues the game', () => {
      GameManager.state = {
        keepPlaying: false
      } as GameState

      GameManager.keepPlaying()

      expect(GameManager.state.keepPlaying).toEqual(true)
      expect(continueGame).toHaveBeenCalledTimes(1)
    })
  })

  describe('isGameTerminated()', () => {
    it('Returns true if the game is lost', () => {
      GameManager.state = {
        gameOver: true
      } as GameState

      const result = GameManager.isGameTerminated()

      expect(result).toEqual(true)
    })

    it('Returns true if the game is won and keepPlaying is false', () => {
      GameManager.state = {
        won: true,
        keepPlaying: false
      } as GameState

      const result = GameManager.isGameTerminated()

      expect(result).toEqual(true)
    })

    it('Returns false if the game is won and keepPlaying is true', () => {
      GameManager.state = {
        won: true,
        keepPlaying: true
      } as GameState

      const result = GameManager.isGameTerminated()

      expect(result).toEqual(false)
    })

    it('Returns false if the game is not won or lost', () => {
      GameManager.state = {
        won: false,
        gameOver: false
      } as GameState

      const result = GameManager.isGameTerminated()

      expect(result).toEqual(false)
    })
  })

  describe('addStartTiles()', () => {
    it('Adds two start tiles', () => {
      const addStartTile = jest
        .spyOn(GameManager, 'addRandomTile')
        .mockImplementation(() => {})

      GameManager.addStartTiles()

      expect(addStartTile).toHaveBeenCalled()
    })
  })

  describe('actuate()', () => {
    it('Updates the best score', () => {
      GameManager.state = {
        score: 10
      } as GameState

      GameManager.actuate()

      expect(actuate).toHaveBeenCalledTimes(1)
    })
  })

  describe('positionsEqual()', () => {
    it('Returns true if positions are equal', () => {
      expect(
        GameManager.positionsEqual({ x: 0, y: 0 }, { x: 0, y: 0 })
      ).toBeTruthy()
    })

    it('Returns false if positions are not equal', () => {
      expect(
        GameManager.positionsEqual({ x: 0, y: 0 }, { x: 1, y: 0 })
      ).toBeFalsy()
    })
  })
})
