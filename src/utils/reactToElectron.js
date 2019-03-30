const { ipcRenderer } = window.require('electron')

export default (type, options) => new Promise((resolve, reject) => {
  ipcRenderer.send(type+'-message', JSON.stringify({ type, options }))
  ipcRenderer.once(type, (event, arg) => {
    try {
      const data = JSON.parse(arg)
      resolve(data)
    } catch (error) {
      console.log('reactToElectron.js Error: ', error)
      reject('Failed')
    }
  })
})