export default (state = '', action) => {
  switch (action.type) {
    case 'SET_SCREEN':
      return action.payload
    default:
      return state
  }
}