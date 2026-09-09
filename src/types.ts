import type { Tile } from './tile.js'

/** Game State */
export type GameState = {
  /** Best Score */
  bestScore: number
  /** Game Over */
  gameOver: boolean
  /** Game Grid */
  grid: {
    size: number
    cells: (Tile | null)[][]
  }
  /** Keep Playing */
  keepPlaying: boolean
  /** Game Score */
  score: number
  /** Game Terminated */
  terminated: boolean
  /** Game Won */
  won: boolean
}

/** Position */
export type Position = {
  /** `x` Position */
  x: number
  /** `y` Position */
  y: number
}
