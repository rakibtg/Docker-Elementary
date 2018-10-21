import React, { Component } from 'react';
import './App.css';
import { Button, Text, Pane, Heading, Checkbox,
  Badge, Switch } from 'evergreen-ui'
import Logo from './logo.svg'
const { ipcRenderer } = window.require("electron")

class App extends Component {

  state = {
    containers: [],
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

  render() {
    const {containers} = this.state
    console.log('Fire:', containers.length)
    return (
      <div className='app'>
        <div className='app-header'>
          <Pane display="flex" padding={16} background="tint2">
            <Pane flex={1} display="flex">
              <Heading size={600}>
                <div className="logo-wrapper">
                  <img src={Logo}/>
                  <span>Docker Elementary</span>
                </div>
              </Heading>
            </Pane>
            <Pane>
              <Button iconBefore="git-pull">GitHub</Button>
            </Pane>
          </Pane>
        </div>
        <div className='app-body'>
          <div className='app-container'>
            {
              containers.map((container, index) => <div key={index} className='container-list-wrapper'>
                <div className='container-list-left'>
                  <Switch height={20} checked />
                </div>
                <div className='container-list-body'>
                  <Text marginRight={16}>{container.Name.replace('/', '')}</Text> <Badge color="neutral" marginRight={8}>{container.shortId}</Badge>
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
