const { ipcMain } = require('electron')
const fetchContainers = require('../controllers/containers/fetch-containers')

module.exports = communicator = async () => {

  ipcMain.on('asynchronous-message', async (event, arg) => {

    const payloads = JSON.parse(arg)

    console.log('Payloads: ', payloads)

    if(payloads.type === 'fetch-containers') {
      event.sender.send(
        'electron-to-react', 
        JSON.stringify(await fetchContainers(payloads.options.filter))
      )
    }

  })

}