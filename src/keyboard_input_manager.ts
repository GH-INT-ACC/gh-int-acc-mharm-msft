/**
 * Keyboard Input Manager
 *
 * Singleton class that manages keyboard inputs.
 */
export class KeyboardInputManager {
  /** Events */
  static events: { [key: string]: any[] } = {}

  constructor() {
    KeyboardInputManager.events = {}
    KeyboardInputManager.listen()
  }

  /**
   * Adds an event listener.
   *
   * @param event Event
   * @param callback Callback
   */
  static on(event: string, callback: any): void {
    if (!KeyboardInputManager.events[event])
      KeyboardInputManager.events[event] = []

    KeyboardInputManager.events[event].push(callback)
  }

  /**
   * Emits an event to all listeners.
   *
   * @param event Event
   * @param data Data
   */
  static emit(event: string, data?: any): void {
    if (KeyboardInputManager.events[event])
      for (const callback of KeyboardInputManager.events[event]) callback(data)
  }

  /**
   * Listens for events.
   */
  static listen(): void {
    const map = {
      ArrowUp: 0,
      ArrowRight: 1,
      ArrowDown: 2,
      ArrowLeft: 3,
      w: 0, // Up
      a: 3, // Left
      s: 2, // Down
      d: 1 // Right
    }

    // Respond to direction keys.
    document.addEventListener('keydown', function (event: KeyboardEvent) {
      // Ignore the event if it includes a modifier key.
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
        return

      const mappedKey = map[event.key as keyof typeof map]

      if (mappedKey !== undefined) {
        event.preventDefault()
        KeyboardInputManager.emit('move', mappedKey)
      }

      // R key restarts the game.
      if (event.key === 'r') {
        event.preventDefault()
        KeyboardInputManager.restart(event)
      }
    })

    // Respond to button presses.
    KeyboardInputManager.bindButtonPress(
      '.retry-button',
      KeyboardInputManager.restart
    )
    KeyboardInputManager.bindButtonPress(
      '.keep-playing-button',
      KeyboardInputManager.keepPlaying
    )

    // Lab 5: New Game Button
    KeyboardInputManager.bindButtonPress(
      '.restart-button',
      KeyboardInputManager.restart
    )
  }

  /**
   * Emits a restart event.
   *
   * @param event Event
   */
  static restart(event: Event) {
    event.preventDefault()
    KeyboardInputManager.emit('restart')
  }

  /**
   * Emits a keep playing event.
   *
   * @param event Event
   */
  static keepPlaying(event: Event) {
    event.preventDefault()
    KeyboardInputManager.emit('keepPlaying')
  }

  /**
   * Binds a button press.
   *
   * @param selector Selector
   */
  static bindButtonPress(selector: any, fn: any) {
    const button = document.querySelector(selector)
    button.addEventListener('click', fn.bind(KeyboardInputManager))
  }
}
