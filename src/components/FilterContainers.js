import React, { Component } from 'react'
import { Spinner, SegmentedControl} from 'evergreen-ui'
import {connect} from 'react-redux'
import fetcher from '../utils/fetcher'

class FilterContainers extends Component {
  state = {
    currentFilterForContainer: 'active'
  }
  render() {
    const {currentFilterForContainer} = this.state
    const {loadingContainerFilter, screen} = this.props
    if(screen !== 'container') return null
    return <SegmentedControl
      width={400}
      height={24}
      options={[
        { label: loadingContainerFilter === 'all' ? <Spinner size={16} /> : 'All', value: 'all' },
        { label: loadingContainerFilter === 'active' ? <Spinner size={16} /> : 'Active', value: 'active' },
        { label: loadingContainerFilter === 'stopped' ? <Spinner size={16} /> : 'Stopped', value: 'stopped' }
      ]}
      value={currentFilterForContainer}
      onChange={value => {
        this.setState({ currentFilterForContainer: value })
        fetcher('getContainers', {filter: value})
      }}
    />
  }
}

const mapStateToProps = state => ({
  loadingContainerFilter: state.container.loading,
  screen: state.screen
})

export default connect(mapStateToProps, null)(FilterContainers)