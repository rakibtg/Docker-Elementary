export const setContainers = payload => ({
  type: 'SET_CONTAINERS',
  payload,
})

export const setLoadingContainer = payload => ({
  type: 'SET_LOADING_CONTAINER',
  payload
})

export const setErrorLoadingContainer = payload => ({
  type: 'SET_ERROR_LOADING_CONTAINER',
  payload
})

export const setContainerStats = payload => ({
  type: 'SET_CONTAINER_STATS',
  payload
})

export const setContainerInProgress = payload => ({
  type: 'SET_CONTAINER_IN_PROGRESS',
  payload
})

export const setContainerState = payload => ({
  type: 'SET_CONTAINER_STATE',
  payload
})