export const getActiveScreen = () => ({
  type: 'GET_ACTIVE_SCREEN'
})

export const setActiveScreen = screen => ({
  type: 'SET_ACTIVE_SCREEN',
  payload: { screen }
})