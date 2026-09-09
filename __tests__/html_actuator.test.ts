import { jest } from '@jest/globals'
import { Tile } from '../src/tile.js'
import type { GameState } from '../src/types.js'

const { HTMLActuator } = await import('../src/html_actuator.js')

describe('HTMLActuator', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('constructor', () => {
    it('Does nothing', async () => {
      expect(new HTMLActuator()).toMatchObject({})
    })
  })

  describe('actuate()', () => {
    it('Actuates the game', () => {
      window.requestAnimationFrame = jest.fn() as any

      HTMLActuator.actuate({} as GameState)

      expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1)
    })
  })

  describe('continueGame()', () => {
    it('Clears the message', () => {
      const clearMessage = jest
        .spyOn(HTMLActuator, 'clearMessage')
        .mockImplementation(() => {})

      HTMLActuator.continueGame()

      expect(clearMessage).toHaveBeenCalledTimes(1)
    })
  })

  describe('clearContainer()', () => {
    it('Clears the tile container', () => {
      const container = document.createElement('div')
      container.appendChild(document.createElement('div'))

      HTMLActuator.clearContainer(container)

      expect(container.firstChild).toBeNull()
    })
  })

  describe('addTile()', () => {
    it('Adds a tile', () => {
      HTMLActuator.tileContainer = document.createElement('div')

      const applyClasses = jest
        .spyOn(HTMLActuator, 'applyClasses')
        .mockImplementation(() => {})
      const tile = new Tile({ x: 0, y: 0 }, 2)

      HTMLActuator.addTile(tile)

      expect(applyClasses).toHaveBeenCalled()
      expect(HTMLActuator.tileContainer.children.length).toBe(1)
    })
  })

  describe('normalizePosition()', () => {
    it('Normalizes a position', () => {
      const position = { x: 1, y: 1 }

      expect(HTMLActuator.normalizePosition(position)).toMatchObject({
        x: 2,
        y: 2
      })
    })
  })

  describe('positionClass()', () => {
    it('Returns a position class', () => {
      const position = { x: 1, y: 1 }

      expect(HTMLActuator.positionClass(position)).toBe('tile-position-2-2')
    })
  })

  describe('message()', () => {
    it('Sets the message (won)', () => {
      const p = document.createElement('p')

      HTMLActuator.messageContainer = document.createElement('div')
      HTMLActuator.messageContainer.appendChild(p)

      HTMLActuator.message(true)

      expect(p.textContent).toBe('You win!')
    })

    it('Sets the message (lost)', () => {
      const p = document.createElement('p')

      HTMLActuator.messageContainer = document.createElement('div')
      HTMLActuator.messageContainer.appendChild(p)

      HTMLActuator.message(false)

      expect(p.textContent).toBe('Game over!')
    })
  })
})
