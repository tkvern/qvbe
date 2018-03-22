export default {
  fetch (key) {
    return JSON.parse(window.localStorage.getItem(key) || '[]')
  },
  save (key, value) {
    if (value !== undefined) {
      window.localStorage.setItem(key, JSON.stringify(value))
    }
  }
}
