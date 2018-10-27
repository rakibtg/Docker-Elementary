import React, { Component } from 'react'
import { Pane, Spinner, SegmentedControl, Text, Icon, Badge } from 'evergreen-ui'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {setScreen} from '../actions/screen'

class AppHeader extends Component {
  state = {
    loadingFilter: '',
    currentFilterForContainer: 'all'
  }
  render() {
    const {loadingFilter, currentFilterForContainer} = this.state
    const {screen, setScreen} = this.props
    return <div className='app-header'>
      <Pane display="flex" padding={16} background="tint1">
        <Pane display="flex">
        </Pane>
        <Pane flex={1} display="flex" alignItems="center" justifyContent="center">
          <SegmentedControl
            width={750}
            height={50}
            options={[
              { label: <Text display='flex' alignItems='center'><Icon size={14} color="muted" icon="layers" marginRight={5}/> Container <Badge color="neutral" marginLeft={5}>29</Badge></Text>, value: 'container' },
              { label: <Text display='flex' alignItems='center'><Icon size={14} color="muted" icon="projects" marginRight={5}/> Image <Badge color="neutral" marginLeft={5}>8</Badge></Text>, value: 'image' },
              { label: <Text display='flex' alignItems='center'><Icon size={14} color="muted" icon="database" marginRight={5}/> Volume <Badge color="neutral" marginLeft={5}>9</Badge></Text>, value: 'volume' },
              { label: <Text display='flex' alignItems='center'><Icon size={14} color="muted" icon="cell-tower" marginRight={5}/> Network <Badge color="neutral" marginLeft={5}>4</Badge></Text>, value: 'network' },
              { label: <Text display='flex' alignItems='center'><Icon size={14} color="muted" icon="shield" marginRight={5}/> Clean-up</Text>, value: 'cleanup' },
            ]}
            value={screen}
            onChange={value => setScreen(value)}
          />
        </Pane>
      </Pane>
      <Pane display='flex' alignItems='center' justifyContent='center' padding={5} background='tint2'>
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
  }
}

const mapStateToProps = state => ({
  screen: state.screen
})

const mapDispatchToProps = dispatch => bindActionCreators( {setScreen}, dispatch )

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader)