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

const cmdLikeAPro = command => new Promise((resolve, reject) => {
  cmd.get(command, (err, data, stderr) => {
    if(err || stderr) reject(err || stderr)
    else resolve(data)
  })
})

ipcMain.on('asynchronous-message', async (event, arg) => {

  if(arg === 'initial-data') {

    const rawContainersFromCmd = await cmdLikeAPro('docker ps -q')
    const containers = rawContainersFromCmd
      .split("\n")
      .map(container => container.trim())
      .filter(container => container !== '')

    const decoratedContainers = await Promise.all(containers.map( async container => {
      const weAreTheFortunateOne = await cmdLikeAPro('docker container inspect '+container)
      let tintContainer = JSON.parse(weAreTheFortunateOne)[0]
      tintContainer['shortId'] = container
      return tintContainer
    }))

    event.sender.send(
      'electron-to-react', 
      JSON.stringify(
        {
          containers: decoratedContainers, 
          eventType:'initial-data'
        }
      )
    )

  }
})
