const cmd = require('node-cmd')

module.exports = cmdLikeAPro = command => new Promise((resolve, reject) => {
  cmd.get(command, (err, data, stderr) => {
    if(err || stderr) reject(err || stderr)
    else resolve(data)
  })
})