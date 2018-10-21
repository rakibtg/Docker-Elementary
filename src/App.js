import React, { Component } from 'react';
import './App.css';
import { Button, Text, Pane, Heading, Checkbox,
  Badge, Switch, SegmentedControl } from 'evergreen-ui'
import Logo from './logo.svg'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.locale(en)
const timeAgo = new TimeAgo('en-US')

const { ipcRenderer } = window.require("electron")

class App extends Component {

  state = {
    containers: [],
    options: [
      { label: 'All', value: 'hourly' },
      { label: 'Active', value: 'daily' },
      { label: 'Stopped', value: 'monthly' },
      { label: 'Re-starting', value: 'cd' },
    ],
    value: 'hourly',
  }

  componentDidMount() {
    ipcRenderer.send('asynchronous-message', 'initial-data')
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
    if(state.Status === 'running') return <Badge color="green" marginRight={8}>
      {timeAgo.format(new Date(state.StartedAt))}
    </Badge>
    else if(state.Status === 'restarting') return <Badge color="yellow" marginRight={8}>RE-STARTING</Badge>
    else return <Badge color="red" marginRight={8}>{state.Status}</Badge>
  }

  render() {
    const {containers} = this.state
    console.log('Fire:', containers.length)
    return (
      <div className='app'>
        <div className='app-header'>
          <Pane display="flex" padding={16} background="tint2">
            <Pane display="flex">
              <Heading size={600}>
                <div className="logo-wrapper">
                  <img src={Logo}/>
                  <span>Docker Elementary</span>
                </div>
              </Heading>
            </Pane>
            <Pane flex={1} display="flex" alignItems="center" justifyContent="center">
              <SegmentedControl
                width={400}
                height={24}
                options={this.state.options}
                value={this.state.value}
                onChange={value => this.setState({ value })}
              />
            </Pane>
            <Pane>
              <Button iconBefore="refresh" height={24} marginRight={16} appearance="primary" intent="success">Refresh</Button>
              <Button iconBefore="git-pull" height={24}>GitHub</Button>
            </Pane>
          </Pane>
        </div>
        <div className='app-body'>
          <div className='app-container'>
            {/* <div className='app-segment-controller'>
              <SegmentedControl
                width={500}
                height={24}
                options={this.state.options}
                value={this.state.value}
                onChange={value => this.setState({ value })}
              />
            </div> */}
            {
              containers.map((container, index) => <div key={index} className='container-list-wrapper'>
                <div className='container-list-left'>
                  <Switch height={20} checked />
                </div>
                <div className='container-list-body'>
                  <Text marginRight={16}>{container.Name.replace('/', '')}</Text> 
                  <Badge color="neutral" marginRight={16}>{container.shortId}</Badge> 
                  {this.renderHeadingStatus(container.State)}
                </div>
              </div>)
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
