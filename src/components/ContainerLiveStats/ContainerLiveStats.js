import React, { Component } from 'react'
import { Pill } from 'evergreen-ui'
import { connect } from 'react-redux'

class ContainerLiveStats extends Component {

  getMemoryUsage(memory) {
    [memory] = memory.split('/')
    let memoryFormated = memory.replace(/[a-zA-Z]/g, '').trim()
    return Number(memoryFormated).toFixed(1) + ' mb'
  }

  render() {
    const { stats, container } = this.props
    const stat = stats.filter(n => n.id === container)
    const validStat = stat[0] ? stat[0] : false

    if(!validStat) return null
    // console.log(validStat)
    return <>
      <Pill 
        paddingLeft={10} 
        paddingRight={10} 
        color="blue" 
        marginRight={8}
        textTransform='lowercase'>
        CPU {validStat.cpu_percentage}
      </Pill>
      <Pill 
        paddingLeft={10} 
        paddingRight={10} 
        color="purple" 
        marginRight={8}
        textTransform='lowercase'
        title={validStat.memory_usage}>
        Ram {this.getMemoryUsage(validStat.memory_usage)}
      </Pill>
    </>
  }
}

const mapStateToProps = state => ({
  stats: state.container.stats
})
export default connect(mapStateToProps, null)(ContainerLiveStats)