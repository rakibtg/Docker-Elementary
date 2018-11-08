import {store} from '../index'
import reactToElectron from './reactToElectron'

import {
  setContainers, 
  setContainerStats,
  setLoadingContainer,
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
    // console.log('Stats:', stats)
  },
  containerAction: async (name, containerID) => {
    
  }
}

export default async (recipe, options = {}) => recipes[ recipe ](options)