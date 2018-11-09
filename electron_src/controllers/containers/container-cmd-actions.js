const cmdLikeAPro = require('../../utilities/cmd-pro')

module.exports = fetchContainerStats = (containerID, cmdCommand) => new Promise( async (resolve, reject) => {
  const cmd = `docker container ${cmdCommand} ${containerID}`
  console.log('cmd', cmd)
  const cmdStats = await cmdLikeAPro(cmd)
  const statsArray = cmdStats
    .split("\n")
    .filter(container => container !== '')
    .map(stat => JSON.parse(stat))
  resolve(statsArray)
})