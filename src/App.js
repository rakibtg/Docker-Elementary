import React, { Component } from 'react';
import './App.css';
import { Button, Text, Pane, Heading, Checkbox, Spinner,
  Badge, Switch, SegmentedControl, Pill, Strong } from 'evergreen-ui'
import Logo from './logo.svg'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.locale(en)
const timeAgo = new TimeAgo('en-US')

const { ipcRenderer } = window.require("electron")

class App extends Component {

  state = {
    containers: {},
    options: [
      { label: 'Containers', value: 'hourly' },
      { label: 'Images', value: 'daily' }
    ],
    value: 'hourly',
    filterContainers: [
      { label: 'All', value: 'all' },
      { label: 'Active', value: 'active' },
      { label: <Spinner size={16} />, value: 'stopped' },
    ],
    currentFilterForContainer: 'active',
    mouseHoveredOn: -1,
    switches: [],
  }

  componentDidMount() {
    this.containerFetcher()
  }

  containerFetcher(filter = 'active') {
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
    if(data.eventType === 'initial-data') {
      this.setState({
        containers: data.containers
      })
      console.log('Containers: ', data)
    }
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

  render() {

    const {
      containers, mouseHoveredOn, filterContainers, 
      currentFilterForContainer
    } = this.state

    console.log('Fire:', Object.keys(containers).length)
    return (
      <div className='app'>
        <div className='app-header'>
          <Pane display="flex" padding={16} background="tint2">
            <Pane display="flex">
              <Heading size={600}>
                <div className="logo-wrapper">
                  <img src={Logo}/>
                  <Strong size={500}>Docker Elementary</Strong>
                </div>
              </Heading>
            </Pane>
            <Pane flex={1} display="flex" alignItems="center" justifyContent="center">
              <SegmentedControl
                width={300}
                height={28}
                options={this.state.options}
                value={this.state.value}
                onChange={value => this.setState({ value })}
              />
            </Pane>
            <Pane display='flex' alignItems='center'>
              <Button iconBefore="refresh" height={24} marginRight={16} appearance="primary" intent="success">Refresh</Button>
              <Button iconBefore="git-pull" height={24}>GitHub</Button>
            </Pane>
          </Pane>
          <Pane display='flex' alignItems='center' justifyContent='center' padding={5} background='tint1'>
            <SegmentedControl
              width={400}
              height={24}
              options={filterContainers}
              value={currentFilterForContainer}
              onChange={value => {
                this.setState({ currentFilterForContainer: value })
                this.containerFetcher(value)
              }}
            />
          </Pane>
        </div>
        <div className='app-body'>
          <div className='app-container'>
            {
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
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
