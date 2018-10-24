const cmdLikeAPro = require('../../utilities/cmd-pro')

module.exports = fetchContainers = (status) => new Promise( async (resolve, reject) => {
  const rawContainersFromCmd = await cmdLikeAPro('docker ps -q -a')
  let containers = rawContainersFromCmd
    .split("\n")
    .map(container => container.trim())
    .filter(container => container !== '')
  let results = {}
  await Promise.all(containers.map(async container => {
    const weAreTheFortunateOne = await cmdLikeAPro('docker container inspect '+container)
    let tintContainer = JSON.parse(weAreTheFortunateOne)[0]
    tintContainer['shortId'] = container
    // Filter containers.
    if(status === 'active') {
      if(tintContainer.State.Running === true) results[container] = tintContainer
    } else if(status === 'all') {
      results[container] = tintContainer
    } else if(status === 'stopped') {
      if(tintContainer.State.Running !== true) results[container] = tintContainer
    }
  }))
  resolve({
    containers: results,
    eventType:'initial-data'
  })
})