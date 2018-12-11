export const nodesLog = {
  data      : '',
  title     : '',
  other     : {},
  nodeID    : '',
}

export default {
  screen: 'container',
  container: {
    loading       : '',
    containers    : {},
    stats         : [],
    inProgress    : -1
  },
  error: {
    isError         : false,
    message         : '',
    title           : 'Message Alert',
    confirmLabel    : 'Ok',
    hasCancel       : false
  },
  nodesLog
}