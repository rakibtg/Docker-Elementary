const { app, BrowserWindow, ipcMain } = require('electron')
const cmd = require('node-cmd')

let win

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600})
  // win.loadFile('index.html')
  win.loadURL('http://localhost:3000/')
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if(win === null) createWindow()
})

ipcMain.on('asynchronous-message', (event, arg) => {
  if(arg === 'initial-data') {
    cmd.get('docker container ps', (err, data, stderr) => {
      event.sender.send('electron-to-react', JSON.stringify({items: data, eventType:'initial-data'}))
    })
  }
})
