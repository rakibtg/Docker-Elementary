import React, { Component } from 'react'
import './App.css'
import {connect} from 'react-redux'

import ContainerScreen from './screens/ContainerScreen'
import ImageScreen from './screens/ImageScreen'
import VolumeScreen from './screens/VolumeScreen'
import NetworkScreen from './screens/NetworkScreen'
import CleanUpScreen from './screens/CleanUpScreen'

import GlobalTopHeader from './components/AppHeader'

class App extends Component {

  renderActiveScreen() {
    const { screen } = this.props
    switch (screen) {
      case 'container':
        return <ContainerScreen/>
      case 'image':
        return <ImageScreen/>
      case 'volume':
        return <VolumeScreen/>
      case 'network':
        return <NetworkScreen/>
      case 'cleanup':
        return <CleanUpScreen/>
      default:
        return <div>Welcome to Docker Elementary!</div>
    }
  }

  render() {
    return (
      <div className='app'>
        <GlobalTopHeader/>
        <div className='app-body'>
          <div className='app-container'>
            {this.renderActiveScreen()}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  screen: state.screen
})

export default connect(mapStateToProps, null)(App)