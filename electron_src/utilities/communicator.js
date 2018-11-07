const { ipcMain } = require('electron')
const fetchContainers = require('../controllers/containers/fetch-containers')
const fetchContainerStats = require('../controllers/containers/fetch-stats')

module.exports = communicator = async () => {

  ipcMain.on('fetch-containers-message', async (event, arg) => {
    const payloads = JSON.parse(arg)
    const containers = await fetchContainers(payloads.options.filter)
    event.sender.send('fetch-containers', JSON.stringify(containers))
  })

  ipcMain.on('fetch-container-stats-message', async (event, arg) => {
    const stats = await fetchContainerStats()
    event.sender.send('fetch-container-stats', JSON.stringify(stats))
  })

}