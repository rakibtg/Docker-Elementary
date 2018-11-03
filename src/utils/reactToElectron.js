const {ipcRenderer} = window.require('electron')

export default (type, options) => new Promise((resolve, reject) => {
  ipcRenderer.send('asynchronous-message', JSON.stringify({ type, options }))
  ipcRenderer.on('electron-to-react', (event, arg) => {
    const data = JSON.parse(arg)
    resolve(data)
  })
})