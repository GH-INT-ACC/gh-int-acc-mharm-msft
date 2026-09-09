import { jest } from '@jest/globals'
import { Tile } from '../src/tile.js'

const { Grid } = await import('../src/grid.js')

describe('Grid', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('constructor', () => {
    it('Sets size and empties the grid', async () => {
      const empty = jest.spyOn(Grid, 'empty').mockImplementation(() => {})
      const fromState = jest
        .spyOn(Grid, 'fromState')
        .mockImplementation(() => {})

      new Grid(4)

      expect(Grid.size).toEqual(4)
      expect(empty).toHaveBeenCalledTimes(1)
      expect(fromState).not.toHaveBeenCalled()
    })

    it('Sets size and restores from previous state', async () => {
      const empty = jest.spyOn(Grid, 'empty').mockImplementation(() => {})
      const fromState = jest
        .spyOn(Grid, 'fromState')
        .mockImplementation(() => {})

      new Grid(4, [] as any)

      expect(Grid.size).toEqual(4)
      expect(empty).not.toHaveBeenCalled()
      expect(fromState).toHaveBeenCalledTimes(1)
    })
  })

  describe('randomAvailableCell()', () => {
    it('Returns a random available cell', () => {
      jest.spyOn(Grid, 'availableCells').mockReturnValue([{ x: 0, y: 0 }])

      expect(Grid.randomAvailableCell()).not.toBeNull()
    })

    it('Returns null when all cells are occupied', () => {
      jest.spyOn(Grid, 'availableCells').mockReturnValue([])

      expect(Grid.randomAvailableCell()).toBeNull()
    })
  })

  describe('eachCell()', () => {
    it('Calls a callback function for all cells', () => {
      const callback = jest.fn()

      Grid.cells = [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null]
      ]

      Grid.eachCell(callback)

      expect(callback).toHaveBeenCalledTimes(16)
    })
  })

  describe('cellsAvailable()', () => {
    it('Returns true when there are cells available', () => {
      jest.spyOn(Grid, 'availableCells').mockReturnValue([{ x: 0, y: 0 }])

      expect(Grid.cellsAvailable()).toBeTruthy()
    })

    it('Returns false when there are no cells available', () => {
      jest.spyOn(Grid, 'availableCells').mockReturnValue([])

      expect(Grid.cellsAvailable()).toBeFalsy()
    })
  })

  describe('cellAvailable()', () => {
    it('Returns true when the cell is available', () => {
      jest.spyOn(Grid, 'cellOccupied').mockReturnValue(false)

      expect(Grid.cellAvailable({ x: 0, y: 0 })).toBeTruthy()
    })

    it('Returns false when the cell is occupied', () => {
      jest.spyOn(Grid, 'cellOccupied').mockReturnValue(true)

      expect(Grid.cellAvailable({ x: 0, y: 0 })).toBeFalsy()
    })
  })

  describe('insertTile()', () => {
    it('Inserts a tile at the given position', () => {
      Grid.cells = [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null]
      ]

      const tile = new Tile({ x: 0, y: 0 }, 2)

      Grid.insertTile(tile)

      expect(Grid.cellContent({ x: 0, y: 0 })).toBe(tile)
    })
  })

  describe('removeTile()', () => {
    it('Removes a tile from the grid', () => {
      Grid.cells = [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null]
      ]

      const tile = new Tile({ x: 0, y: 0 }, 2)

      Grid.insertTile(tile)
      Grid.removeTile(tile)

      expect(Grid.cellContent({ x: 0, y: 0 })).toBeNull()
    })
  })
})
