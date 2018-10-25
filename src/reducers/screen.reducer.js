export default ( state = [], action ) => {
  console.log('Action Type: ', action)
  switch(action.type) {
    case 'GET_ACTIVE_SCREEN':
      return state.activeScreen

    case 'SET_ACTIVE_SCREEN':
      return [
        ...state,
        {
          activeScreen: action.payload.screen
        }
      ]

    default:
      return state

  }
}