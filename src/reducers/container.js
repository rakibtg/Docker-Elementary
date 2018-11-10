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
    case 'UPDATE_SINGLE_CONTAINER_BY_ID':
      return Object.assign(
        {},
        state,
        {
          containers: {
            ...state.containers,
            [action.payload.shortId]: action.payload
          }
        }
      )
    case 'REMOVE_CONTAINER_FROM_STORE_BY_ID':
      let containers = Object.assign({}, state.containers)
      delete containers[action.payload] // action.payload is the container id
      return Object.assign(
        {},
        state,
        { containers }
      )
    default:
      return state
  }
}