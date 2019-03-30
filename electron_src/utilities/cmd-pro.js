const child_process = require( 'child_process' )

module.exports = cmdLikeAPro = command => new Promise((resolve, reject) => {
  child_process.exec(command, {maxBuffer : 1500 * 1024}, function(error, stdout, stderr) {
    if( !!error ) reject( error )
    else resolve( stdout || stderr )
  })
})