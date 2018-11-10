const { ipcMain } = require('electron')
const containerController = require('../controllers/containers/fetch-containers')
const fetchContainerStats = require('../controllers/containers/fetch-stats')
const containerCmdActions = require('../controllers/containers/container-cmd-actions')

module.exports = communicator = async () => {

  ipcMain.on('fetch-containers-message', async (event, arg) => {
    const payloads = JSON.parse(arg)
    const containers = await containerController.fetchContainers(payloads.options.filter)
    event.sender.send('fetch-containers', JSON.stringify(containers))
  })

  ipcMain.on('fetch-container-stats-message', async event => {
    const stats = await fetchContainerStats()
    event.sender.send('fetch-container-stats', JSON.stringify(stats))
  })

  ipcMain.on('container-cmd-actions-message', async (event, arg) => {
    const payloads = JSON.parse(arg)
    try {
      const commandResponse = await containerCmdActions(
        payloads.options.containerID, 
        payloads.options.cmdCommand
      )
      event.sender.send('container-cmd-actions', JSON.stringify(commandResponse))
    } catch (error) {
      event.sender.send(
        'container-cmd-actions', 
        JSON.stringify({
          failed: 1,
          message: error
        })
      )
    }
  })

  ipcMain.on('get-single-container-message', async (event, arg) => {
    const payloads = JSON.parse(arg)
    const container = await containerController.fetchContainerByID(payloads.options)
    event.sender.send('get-single-container', JSON.stringify(container))
  })

}