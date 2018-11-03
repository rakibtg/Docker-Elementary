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
    default:
      return state
  }
}