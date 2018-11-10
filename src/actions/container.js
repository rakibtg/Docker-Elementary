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

export const updateSingleContainerByID = payload => ({
  type: 'UPDATE_SINGLE_CONTAINER_BY_ID',
  payload
})

export const removeContainerFromStoreByID = payload => ({
  type: 'REMOVE_CONTAINER_FROM_STORE_BY_ID',
  payload
})