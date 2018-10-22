const { ipcMain } = require('electron')
const fetchContainers = require('../controllers/containers/fetch-containers')

module.exports = communicator = async () => {

  ipcMain.on('asynchronous-message', async (event, arg) => {

    if(arg === 'initial-data') {
      var results = await fetchContainers()
      event.sender.send(
        'electron-to-react', 
        JSON.stringify(results)
      )
    }
  })

}