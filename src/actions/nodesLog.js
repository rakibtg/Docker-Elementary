export const openLogExplorer = payload => {
  // console.log('From action:', payload)
  return {
    type: 'OPEN_LOG_EXPLORER',
    payload,
  }
}

export const closeLogExplorer = payload => ({
  type: 'CLOSE_LOG_EXPLORER'
})