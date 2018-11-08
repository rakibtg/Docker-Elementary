import React, { Component } from 'react'
import { Pill } from 'evergreen-ui'
import { connect } from 'react-redux'

class ContainerLiveStats extends Component {

  render() {
    const { stats, container } = this.props
    const containerDetails = stats.filter(n => n.id === container)
    const validStat = stat[0] ? stat[0] : false

    if(!validStat) return null
    // console.log(validStat)
    return <div>hello</div>
  }
}

const mapStateToProps = state => ({
  stats: state.container.stats
})
export default connect(mapStateToProps, null)(ContainerLiveStats)