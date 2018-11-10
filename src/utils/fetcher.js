import {store} from '../index'
import reactToElectron from './reactToElectron'

import {
  setContainers, 
  setContainerStats,
  setLoadingContainer,
  setContainerInProgress,
  updateSingleContainerByID,
  removeContainerFromStoreByID
} from '../actions/container'

const recipes = {
  getContainers: async options => {
    const filter = options.filter ? options.filter : 'active'
    // Dispatch loading...
    store.dispatch(setLoadingContainer(filter))
    try{
      const containers = await reactToElectron('fetch-containers', { filter })
      store.dispatch(setContainers(containers))
      store.dispatch(setLoadingContainer(''))
    } catch (e) {
      // Dispatch error.
    }
  },
  getContainerStats: async () => {
    const stats = await reactToElectron('fetch-container-stats')
    store.dispatch(setContainerStats(stats))
  },
  containerCmdAction: async payload => new Promise(async (resolve, reject) => {
    const command = payload.cmdCommand
    store.dispatch(setContainerInProgress(payload.containerID))
    try {
      const commandResponse = await reactToElectron('container-cmd-actions', payload)
      console.log(commandResponse)
      if(commandResponse.failed) {
        console.log('Failed!')
      }
      store.dispatch(setContainerInProgress(-1))
      if(!['rm'].includes(command)) {
        recipes.updateContainerByID(payload.containerID)
      }
      if(command === 'rm') {
        recipes.removeContainerFromStore(payload.containerID)
      }
    } catch (error) {
      console.log('Error happended')
      console.log(error)
      store.dispatch(setContainerInProgress(-1))
    }
    resolve(true)
  }),
  updateContainerByID: async containerID => {
    const container = await reactToElectron('get-single-container', containerID)
    store.dispatch(updateSingleContainerByID(container))
  },
  removeContainerFromStore: containerID => {
    store.dispatch(removeContainerFromStoreByID(containerID))
  }
}

export default async (recipe, options = {}) => recipes[ recipe ](options)