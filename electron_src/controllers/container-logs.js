const cmdLikeAPro = require('../utilities/cmd-pro')

module.exports = getContainerLogs = containerID => new Promise( 
  async (resolve, reject) => {
    try {
      const cmd = `docker container logs ${containerID} --tail 1500`
      const data = await cmdLikeAPro(cmd)
      resolve({logs: data})
    } catch (error) {
      reject(error)
      console.log('Error in container-logs.js', error)
    }
  }
 )