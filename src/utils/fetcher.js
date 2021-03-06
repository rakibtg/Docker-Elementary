import React from 'react'
import {
  Heading,
  Text,
  Strong
} from 'evergreen-ui'
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

import {
  raiseError
} from '../actions/error'

import {
  openLogExplorer
} from '../actions/nodesLog'

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
    const hideErrorDialog = payload.hideErrorDialog ? payload.hideErrorDialog : false
    store.dispatch(setContainerInProgress(payload.containerID))
    try {
      const commandResponse = await reactToElectron('container-cmd-actions', payload)
      if(commandResponse.failed && hideErrorDialog === false) {
        store.dispatch(raiseError({
          isError: true,
          message: <>
            <Heading>Unable to start or stop the container</Heading>
            <Strong>Command: </Strong><Text>{commandResponse.message.cmd}</Text>
          </>,
          title: '🧐 Something went wrong',
          confirmLabel: 'Ok',
          hasCancel: false
        }))
      }
      store.dispatch(setContainerInProgress(-1))
      if(!['rm'].includes(command)) {
        recipes.updateContainerByID(payload.containerID)
      }
      if(command === 'rm') {
        recipes.removeContainerFromStore(payload.containerID)
      }
    } catch (error) {
      console.log('Fetcher.js Error - 9378', error)
    }
    resolve(true)
  }),
  updateContainerByID: async containerID => {
    const container = await reactToElectron('get-single-container', containerID)
    store.dispatch(updateSingleContainerByID(container))
  },
  removeContainerFromStore: containerID => {
    store.dispatch(removeContainerFromStoreByID(containerID))
  },
  openLogViewer: async ({title, nodeID, data = 'No logs are found!', other}) => {
    try {
      data = await reactToElectron('get-container-logs', { nodeID })
    } catch (error) {
      console.log('Fetcher.js Error - 2626', error)
    }
    store.dispatch(openLogExplorer({
      title,
      nodeID,
      data: data.logs,
      other
    }))
  }
}

export default async (recipe, options = {}) => recipes[ recipe ]( options )