const cmdLikeAPro = require('../../utilities/cmd-pro')

module.exports = fetchContainerStats = () => new Promise( async (resolve, reject) => {
  const cmd = `docker container stats --no-stream --format '{"id": "{{.ID}}", "cpu_percentage": "{{.CPUPerc}}", "memory_usage": "{{.MemUsage}}", "network_io": "{{.NetIO}}"}'`
  const cmdStats = await cmdLikeAPro(cmd)
  const statsArray = cmdStats
    .split("\n")
    .filter(container => container !== '')
    .map(stat => JSON.parse(stat))
  resolve(statsArray)
})