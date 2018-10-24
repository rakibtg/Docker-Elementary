const { app, BrowserWindow } = require('electron')
const communicator = require('./electron_src/utilities/communicator')

let win

function createWindow () {
  win = new BrowserWindow({ 
    width: 900, 
    height: 700, 
    minHeight: 400, 
    minWidth: 750 
  })
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

communicator()