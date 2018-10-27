import React, { Component } from 'react';
import './App.css';
import { Button, Text, Pane, Spinner, Icon,
  Badge, Switch, SegmentedControl, Pill, Strong } from 'evergreen-ui'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {setScreen} from './actions/screen'

import ContainerScreen from './screens/ContainerScreen'
import ImageScreen from './screens/ImageScreen'
import VolumeScreen from './screens/VolumeScreen'
import NetworkScreen from './screens/NetworkScreen'
import CleanUpScreen from './screens/CleanUpScreen'

import GlobalTopHeader from './components/AppHeader'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.locale(en)
const timeAgo = new TimeAgo('en-US')


const { ipcRenderer } = window.require("electron")

class App extends Component {

  state = {
    containers: {},
    options: [
      { label: <Text display='flex' alignItems='center'><Icon size={14} color="muted" icon="layers" marginRight={5}/> Container <Badge color="neutral" marginLeft={5}>29</Badge></Text>, value: 'container' },
      { label: <Text display='flex' alignItems='center'><Icon size={14} color="muted" icon="projects" marginRight={5}/> Image <Badge color="neutral" marginLeft={5}>8</Badge></Text>, value: 'image' },
      { label: <Text display='flex' alignItems='center'><Icon size={14} color="muted" icon="database" marginRight={5}/> Volume <Badge color="neutral" marginLeft={5}>9</Badge></Text>, value: 'volume' },
      { label: <Text display='flex' alignItems='center'><Icon size={14} color="muted" icon="cell-tower" marginRight={5}/> Network <Badge color="neutral" marginLeft={5}>4</Badge></Text>, value: 'network' },
      { label: <Text display='flex' alignItems='center'><Icon size={14} color="muted" icon="shield" marginRight={5}/> Clean-up</Text>, value: 'cleanup' },
    ],
    value: 'container',
    currentFilterForContainer: 'active',
    mouseHoveredOn: -1,
    switches: [],
    refreshBtnLoading: false,
    activeFilter: 'active',
    activeScreen: 'container',
    loadingFilter: ''
  }

  renderContainersLabel() {
    return <Text>Containers <Pill paddingLeft={10} paddingRight={10} color="green" marginRight={8}>28</Pill></Text>
  }

  componentDidMount() {
    this.containerFetcher()
  }

  containerFetcher(filter = 'active') {
    this.setState({ activeFilter: filter })
    ipcRenderer.send('asynchronous-message', JSON.stringify({
      type: 'fetch-containers',
      options: {
        filter,
      }
    }))
    ipcRenderer.on('electron-to-react', this.handleElectronRequests.bind(this))
  }

  handleElectronRequests(event, arg) {
    const data = JSON.parse(arg)
    this.setState({
      filterContainers: [
        { label: 'All', value: 'all' },
        { label: 'Active', value: 'active' },
        { label: 'Stopped', value: 'stopped' }
      ]
    }, () => {
      if(data.eventType === 'initial-data') {
        this.setState({
          containers: data.containers,
          refreshBtnLoading: false,
          loadingFilter: '',
          mouseHoveredOn: -1
        })
        console.log('Containers: ', data)
      }
    })
  }

  renderHeadingStatus(state) {
    if(state.Status === 'running') return <Pill paddingLeft={10} paddingRight={10} color="green" marginRight={8}>
      {timeAgo.format(new Date(state.StartedAt))}
    </Pill>
    else if(state.Status === 'restarting') return <Pill paddingLeft={10} paddingRight={10} color="yellow" marginRight={8}>RE-STARTING</Pill>
    else return <Pill paddingLeft={10} paddingRight={10} color="neutral" marginRight={8}>{state.Status}</Pill>
  }

  handleMouseHover(index) {
    this.setState({
      mouseHoveredOn: index
    })
  }

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

    const {
      containers, mouseHoveredOn, loadingFilter,
      currentFilterForContainer, activeFilter
    } = this.state

    console.log('Fire:', Object.keys(containers).length)
    return (
      <div className='app'>

        {/* <Pane display='flex' justifyContent='center' alignItems='center' paddingTop={10}>
          <Text paddingRight={10}>{this.props.screen}</Text> 
          <Button onClick={() => {
            this.props.setScreen('Redux 🎉')
          }}>🦄</Button>
        </Pane> */}

        <GlobalTopHeader/>
        <div className='app-body'>
          <div className='app-container'>
            {this.renderActiveScreen()}
            {/* {
              Object.keys(containers).map((containerShortId, index) => {
                const container = containers[containerShortId]
                const isHovered = index === mouseHoveredOn
                const wrapperClass = isHovered ? 'container-list-wrapper active-list' : 'container-list-wrapper inactive-list'
                return <div key={index} className={wrapperClass}>
                  <div className='container-list-left'>
                    <Switch marginLeft={16} height={22} checked={container.State.Running} />
                  </div>
                  <div className='container-list-body' onMouseEnter={() => this.handleMouseHover(index)}>
                    <Strong marginRight={16}>{container.Name.replace('/', '')}</Strong> 
                    <Pill paddingLeft={10} paddingRight={10} color="neutral" marginRight={16}>{container.shortId}</Pill> 
                    {this.renderHeadingStatus(container.State)}
                  </div>
                  {
                    isHovered && <div className='container-list-right'>
                      <Button marginRight={16} height={22} appearance='primary' intent='none'>View</Button>
                    </div>
                  }
                </div>
              })
            } */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  screen: state.screen
})

const mapDispatchToProps = dispatch => bindActionCreators( {setScreen}, dispatch )

export default connect(mapStateToProps, mapDispatchToProps)(App)