import type { Position } from './types.js'

/** Tile */
export class Tile {
  /** Tile Merged From */
  mergedFrom: Tile[] | null = null
  /** Tile Position */
  position: Position
  /** Tile Previous Position */
  previousPosition: Position | null = null
  /** Tile Value */
  value: number

  /**
   * Creates a Tile instance.
   *
   * @param position Tile Starting Position
   * @param value Tile Starting Value (Default: 2)
   */
  constructor(position: Position, value?: number) {
    this.position = position
    this.value = value || 2
  }

  /**
   * Saves the current position of the tile.
   */
  savePosition(): void {
    this.previousPosition = this.position
  }

  /**
   * Updates the position of the tile.
   *
   * @param position New Position
   */
  updatePosition(position: Position): void {
    this.position = position
  }
}
