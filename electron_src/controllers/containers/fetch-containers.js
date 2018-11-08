const cmdLikeAPro = require('../../utilities/cmd-pro')

const lightContainerDetail = (id, inspectedData) => ({
  Id: inspectedData.Id,
  shortId: id,
  Created: inspectedData.Created,
  State: inspectedData.State,
  Name: inspectedData.Name
})

module.exports = fetchContainers = (status) => new Promise( async (resolve, reject) => {
  const rawContainersFromCmd = await cmdLikeAPro('docker ps -q -a')
  const containers = rawContainersFromCmd
    .split("\n")
    .map(container => container.trim())
    .filter(container => container !== '')
  let results = {}
  await Promise.all(containers.map(async container => {
    const weAreTheFortunateOne = await cmdLikeAPro('docker container inspect '+container)
    const tintContainer = JSON.parse(weAreTheFortunateOne)[0]
    if(status === 'active') {
      if(tintContainer.State.Running === true) results[container] = lightContainerDetail(container, tintContainer)
    } else if(status === 'all') {
      results[container] = lightContainerDetail(container, tintContainer)
    } else if(status === 'stopped') {
      if(tintContainer.State.Running !== true) results[container] = lightContainerDetail(container, tintContainer)
    }
  }))
  resolve(results)
})