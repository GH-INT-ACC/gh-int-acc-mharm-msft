export const animFramePolyfill = () => {
  let lastTime = 0
  const vendors = ['webkit', 'moz']

  for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[
      `${vendors[x]}RequestAnimationFrame` as any
    ] as any
    window.cancelAnimationFrame =
      (window[`${vendors[x]}CancelAnimationFrame` as any] as any) ||
      (window[`${vendors[x]}CancelRequestAnimationFrame` as any] as any)
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
      const currTime = new Date().getTime()
      const timeToCall = Math.max(0, 16 - (currTime - lastTime))
      const id = window.setTimeout(function () {
        callback(currTime + timeToCall)
      }, timeToCall)

      lastTime = currTime + timeToCall

      return id
    }
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id)
    }
  }
}
