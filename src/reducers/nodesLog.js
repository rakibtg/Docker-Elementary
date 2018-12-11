import { nodesLog } from '../store/data'

export default (state = '', action) => {
  switch (action.type) {
    case 'OPEN_LOG_EXPLORER':
      return action.payload
    case 'CLOSE_LOG_EXPLORER':
      return nodesLog
    default:
      return state
  }
}