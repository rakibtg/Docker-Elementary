const cmdLikeAPro = require('../utilities/cmd-pro')

module.exports = getContainerLogs = containerID => new Promise( async (resolve, reject) => {
  const cmd = `docker container logs ${containerID}`
  const data = await cmdLikeAPro(cmd)
  resolve(data)
})