import React, { Component } from 'react';
import './App.css';
import { Button, Text, Pane, Heading, Checkbox, Spinner, Icon,
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
      { label: <Text display='flex' alignItems='center'><Icon size={14} color="muted" icon="layers" marginRight={5}/> Container <Badge color="neutral" marginLeft={5}>29</Badge></Text>, value: 'container' },
      { label: <Text display='flex' alignItems='center'><Icon size={14} color="muted" icon="projects" marginRight={5}/> Image <Badge color="neutral" marginLeft={5}>8</Badge></Text>, value: 'image' },
      { label: <Text display='flex' alignItems='center'><Icon size={14} color="muted" icon="database" marginRight={5}/> Volume <Badge color="neutral" marginLeft={5}>9</Badge></Text>, value: 'volume' },
      { label: <Text display='flex' alignItems='center'><Icon size={14} color="muted" icon="cell-tower" marginRight={5}/> Network <Badge color="neutral" marginLeft={5}>4</Badge></Text>, value: 'network' },
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

  render() {

    const {
      containers, mouseHoveredOn, loadingFilter,
      currentFilterForContainer, activeFilter
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
                  {/* <Strong size={500}>Docker Elementary</Strong> */}
                </div>
              </Heading>
            </Pane>
            <Pane flex={1} display="flex" alignItems="center" justifyContent="center">
              <SegmentedControl
                width={550}
                height={45}
                options={this.state.options}
                value={this.state.value}
                onChange={value => this.setState({ value })}
              />
            </Pane>
            <Pane display='flex' alignItems='center'>
              <Button 
                iconBefore={this.state.refreshBtnLoading ? null : "refresh"} 
                height={24} appearance="primary" intent="success"
                isLoading={this.state.refreshBtnLoading}
                onClick={() => {
                  this.setState({
                    refreshBtnLoading: true
                  })
                  this.containerFetcher(activeFilter)
                }}
                width={86}>
                Refresh
              </Button>
              {/* <Button iconBefore="git-pull" height={24}>GitHub</Button> */}
            </Pane>
          </Pane>
          <Pane display='flex' alignItems='center' justifyContent='center' padding={5} background='tint1'>
            <SegmentedControl
              width={400}
              height={24}
              options={[
                { label: loadingFilter === 'all' ? <Spinner size={16} /> : 'All', value: 'all' },
                { label: loadingFilter === 'active' ? <Spinner size={16} /> : 'Active', value: 'active' },
                { label: loadingFilter === 'stopped' ? <Spinner size={16} /> : 'Stopped', value: 'stopped' }
              ]}
              value={currentFilterForContainer}
              onChange={value => {
                this.setState({ currentFilterForContainer: value, loadingFilter: value })
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
