import { jest } from '@jest/globals'

const { Tile } = await import('../src/tile.js')

describe('Tile', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('constructor', () => {
    it('Sets position and value', async () => {
      const tile = new Tile({ x: 0, y: 0 }, 2)

      expect(tile.position).toEqual({ x: 0, y: 0 })
      expect(tile.value).toEqual(2)
    })

    it('Sets position and default value', async () => {
      const tile = new Tile({ x: 0, y: 0 })

      expect(tile.position).toEqual({ x: 0, y: 0 })
      expect(tile.value).toEqual(2)
    })
  })

  describe('savePosition()', () => {
    it('Saves the current position of the tile', async () => {
      const tile = new Tile({ x: 0, y: 0 }, 2)

      expect(tile.previousPosition).toBeNull()

      tile.savePosition()

      expect(tile.previousPosition).toEqual({ x: 0, y: 0 })
    })
  })

  describe('updatePosition()', () => {
    it('Updates the position of the tile', async () => {
      const tile = new Tile({ x: 0, y: 0 }, 2)

      expect(tile.position).toEqual({ x: 0, y: 0 })

      tile.updatePosition({ x: 1, y: 1 })

      expect(tile.position).toEqual({ x: 1, y: 1 })
    })
  })
})
