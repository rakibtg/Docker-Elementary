import React, { Component } from 'react'
// import fetcher from '../utils/fetcher'
import { getContainers } from '../actions/container'

import reactToElectron from '../utils/reactToElectron'

class ContainerScreen extends Component {

  async componentDidMount() {
    // fetcher(source, action)
    const containers = await reactToElectron('fetch-containers', { filter: 'active', })
    console.log('Super containers: ', containers)
  }

  render() {
    return <div>from container screen</div>
  }
}

export default ContainerScreen