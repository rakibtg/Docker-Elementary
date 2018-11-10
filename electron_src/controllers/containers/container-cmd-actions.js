const cmdLikeAPro = require('../../utilities/cmd-pro')

module.exports = fetchContainerCommands = (containerID, cmdCommand) => new Promise( async (resolve, reject) => {
  try {
    const cmd = `docker container ${cmdCommand} ${containerID}`
    console.log('Command', cmd)
    const cmdStats = await cmdLikeAPro(cmd)
    resolve(cmdStats)
  } catch (error) {
    reject(error)
  }
})