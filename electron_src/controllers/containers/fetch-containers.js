const cmdLikeAPro = require('../../utilities/cmd-pro')

module.exports = fetchContainers = (args) => new Promise( async (resolve, reject) => {
  const rawContainersFromCmd = await cmdLikeAPro('docker ps -q -a')
  const containers = rawContainersFromCmd
    .split("\n")
    .map(container => container.trim())
    .filter(container => container !== '')
  let results = {}
  await Promise.all(containers.map(async container => {
    const weAreTheFortunateOne = await cmdLikeAPro('docker container inspect '+container)
    let tintContainer = JSON.parse(weAreTheFortunateOne)[0]
    tintContainer['shortId'] = container
    results[container] = tintContainer
  }))
  resolve({
    containers: results,
    eventType:'initial-data'
  })
})