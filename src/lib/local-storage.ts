/**
 * Uses localStorage in the browser, or a mock object when server-side rendering
 */
export const localStorage: Storage = (() => {
  if (typeof window === 'object') {
    return window.localStorage
  } else {
    return {
      /* eslint-disable @typescript-eslint/no-empty-function */
      clear() {},
      getItem() {
        return null
      },
      key() {
        return null
      },
      removeItem() {},
      setItem() {},
      length: 0,
    }
  }
})()
