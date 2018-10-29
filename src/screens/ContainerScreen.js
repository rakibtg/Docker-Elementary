import React, { Component } from 'react'
import fetcher from '../utils/fetcher'
import { getContainers } from '../actions/container'

class ContainerScreen extends Component {

  componentDidMount() {
    console.log('Inside Containers')
    fetcher(getContainers('active-containers'))
  }

  render() {
    return <div>from container screen</div>
  }
}

export default ContainerScreen