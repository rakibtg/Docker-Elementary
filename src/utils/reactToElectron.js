const {ipcRenderer} = window.require('electron')

export default (type, options) => new Promise((resolve, reject) => {
  console.log('Types:', type+'-message')
  ipcRenderer.send(type+'-message', JSON.stringify({ type, options }))
  ipcRenderer.on(type, (event, arg) => {
    try {
      const data = JSON.parse(arg)
      console.log('RAW Data:', data)
      resolve(data)
    } catch (error) {
      reject('Failed')
    }
  })
})