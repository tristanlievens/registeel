import { LocalStorage } from 'node-localstorage'
let localStorage = new LocalStorage('./localStorage');

const storageAdaptor = {
  getItem: function (key, cb) {
    try {
      var s = localStorage.getItem(key)
      process.nextTick(() => {
        cb(null, s)
      })
    } catch (e) {
      cb(e)
    }
  },
  setItem: function (key, string, cb) {
    try {
      localStorage.setItem(key, string)
      process.nextTick(() => {
        cb(null)
      })
    } catch (e) {
      cb(e)
    }
  },
  removeItem: function (key, cb) {
    try {
      localStorage.removeItem(key)
      process.nextTick(() => {
        cb(null)
      })
    } catch (e) {
      cb(e)
    }
  },
  getAllKeys: function (cb) {
    try {
      var keys = []
      for (var i = 0; i < localStorage.length; i++) {
        keys.push(localStorage.key(i))
      }
      process.nextTick(() => {
        cb(null, keys)
      })
    } catch (e) {
      cb(e)
    }
  },
}

export default storageAdaptor
