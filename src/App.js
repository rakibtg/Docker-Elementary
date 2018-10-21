import React, { Component } from 'react';
import './App.css';
const { ipcRenderer } = window.require("electron")

class App extends Component {

  state = {
    items: [],
  }

  componentDidMount() {
    ipcRenderer.send('asynchronous-message', 'initial-data')
    ipcRenderer.on('electron-to-react', this.handleElectronRequests.bind(this))
  }

  handleElectronRequests(event, arg) {
    const data = JSON.parse(arg)
    if(data.eventType === 'initial-data') {

      console.log('Containers: ', data)
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            Docker Elementary
          </div>
        </header>
      </div>
    );
  }
}

export default App;
