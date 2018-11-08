export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_CONTAINERS':
      return Object.assign(
        {}, state, {containers: action.payload}
      )
    case 'SET_LOADING_CONTAINER':
      return Object.assign(
        {}, state, {loading: action.payload}
      )
    case 'SET_ERROR_LOADING_CONTAINER':
      return Object.assign(
        {}, state, {error: action.payload}
      )
    case 'SET_CONTAINER_STATS':
      return Object.assign(
        {}, state, {stats: action.payload}
      )
    case 'SET_CONTAINER_IN_PROGRESS':
      return Object.assign(
        {}, state, {inProgress: action.payload}
      )
    case 'SET_CONTAINER_STATE':
      return Object.assign(
        {}, 
        state, 
        {
          containers: {
            ...state.containers,
            [action.payload.containerID]: {
              ...state['containers'][action.payload.containerID],
              State: {
                ...state['containers'][action.payload.containerID]['State'],
                ...action.payload.updatable
              }
            }
          }
        }
      )
    default:
      return state
  }
}