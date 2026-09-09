import { Tile } from './tile.js'
import { GameState, Position } from './types.js'

/**
 * Grid
 *
 * Singleton class that manages the game grid.
 */
export class Grid {
  /** Size */
  static size: number = 4
  /** Cells */
  static cells: (Tile | null)[][]

  constructor(size: number, previousState?: GameState['grid']['cells']) {
    Grid.size = size

    if (previousState) Grid.fromState(previousState)
    else Grid.empty()
  }

  /**
   * Empties the grid of tiles.
   */
  static empty(): void {
    Grid.cells = []

    for (let x = 0; x < Grid.size; x++) {
      Grid.cells[x] = []
      for (let y = 0; y < Grid.size; y++) Grid.cells[x].push(null)
    }
  }

  /**
   * Sets the grid from the saved state.
   *
   * @param state State
   */
  static fromState(state: GameState['grid']['cells']): void {
    Grid.cells = []

    for (let x = 0; x < Grid.size; x++) {
      Grid.cells[x] = []
      for (let y = 0; y < Grid.size; y++) {
        const tile = state[x][y]
        Grid.cells[x].push(tile ? new Tile(tile.position, tile.value) : null)
      }
    }
  }

  /**
   * Finds the first available random position.
   *
   * @returns Random Available Position
   */
  static randomAvailableCell(): Position | null {
    const cells = Grid.availableCells()

    return cells.length > 0
      ? cells[Math.floor(Math.random() * cells.length)]
      : null
  }

  /**
   * Gets the available cells as positions.
   *
   * @returns Available Cells as Positions
   */
  static availableCells(): Position[] {
    const cells: Position[] = []

    Grid.eachCell(function (position: Position, tile: Tile | null) {
      if (tile === null) cells.push(position)
    })

    return cells
  }

  /**
   * Calls a callback function for every cell.
   *
   * @param callback Callback function
   */
  static eachCell(callback: any): void {
    for (let x = 0; x < Grid.size; x++)
      for (let y = 0; y < Grid.size; y++) callback({ x, y }, Grid.cells[x][y])
  }

  /**
   * Checks if there are any available positions.
   *
   * @returns Available Position Status
   */
  static cellsAvailable(): boolean {
    return Grid.availableCells().length > 0
  }

  /**
   * Checks if the specified cell is available.
   *
   * @param cell Cell
   * @returns Available Cell Status
   */
  static cellAvailable(cell: Position): boolean {
    return !Grid.cellOccupied(cell)
  }

  /**
   * Checks if the specified cell is occupied.
   *
   * @param cell Cell
   * @returns Occupied Cell Status
   */
  static cellOccupied(cell: Position): boolean {
    return !!Grid.cellContent(cell)
  }

  /**
   * Gets the content of the specified cell.
   *
   * @param cell Cell
   * @returns Cell Content
   */
  static cellContent(cell: Position): Tile | null {
    return Grid.withinBounds(cell) ? Grid.cells[cell.x][cell.y] : null
  }

  /**
   * Inserts a tile at a specific position.
   *
   * @param tile Tile
   */
  static insertTile(tile: Tile): void {
    Grid.cells[tile.position.x][tile.position.y] = tile
  }

  /**
   * Removes a tile from the grid.
   *
   * @param tile Tile
   */
  static removeTile(tile: Tile): void {
    Grid.cells[tile.position.x][tile.position.y] = null
  }

  /**
   * Checks if the specified position is within the grid.
   *
   * @param position Position
   * @returns Position Status
   */
  static withinBounds(position: Position): boolean {
    return (
      position.x >= 0 &&
      position.x < Grid.size &&
      position.y >= 0 &&
      position.y < Grid.size
    )
  }
}
