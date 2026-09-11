import type { GameState } from './types.js'

/**
 * Local Storage Manager
 *
 * Singleton class that manages the local storage.
 */
export class LocalStorageManager {
  /** Storage */
  static storage: Storage = window.localStorage

  constructor() {}

  /**
   * Gets the best score.
   *
   * @returns Best Score
   */
  static getBestScore(): number {
    return parseInt(LocalStorageManager.storage.getItem('bestScore') || '0', 10)
  }

  /**
   * Sets the best score.
   *
   * @param score Best Score
   */
  static setBestScore(score: number): void {
    LocalStorageManager.storage.setItem('bestScore', score.toString())
  }

  /**
   * Gets the game state.
   *
   * @returns Game State
   */
  static getGameState(): GameState | null {
    const gameState = LocalStorageManager.storage.getItem('gameState')

    return gameState !== null
      ? JSON.parse(LocalStorageManager.storage.getItem('gameState') as string)
      : null
  }

  /**
   * Sets the game state.
   *
   * @param gameState Game State
   */
  static setGameState(gameState: GameState): void {
    LocalStorageManager.storage.setItem(
      'gameState',
      JSON.stringify({
        ...gameState,
        grid: {
          size: gameState.grid.size,
          cells: gameState.grid.cells
        }
      })
    )
  }

  /**
   * Clears the game state.
   *
   * All values are set to their original defaults.
   */
  static clearGameState(): void {
    LocalStorageManager.storage.removeItem('gameState')
  }
}
