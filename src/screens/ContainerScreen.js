import React, { Component } from 'react'
import fetcher from '../utils/fetcher'
import { connect } from 'react-redux'
import { Switch, Strong, Pill, Button } from 'evergreen-ui'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.locale(en)
const timeAgo = new TimeAgo('en-US')

class ContainerScreen extends Component {

  state = {
    mouseHoveredOn: -1,
  }

  async componentDidMount() {
    fetcher('getContainers', {filter: 'active'})
  }

  handleMouseHover(index) {
    this.setState({
      mouseHoveredOn: index
    })
  }

  renderHeadingStatus(state) {
    if(state.Status === 'running') return <Pill paddingLeft={10} paddingRight={10} color="green" marginRight={8}>
      {timeAgo.format(new Date(state.StartedAt))}
    </Pill>
    else if(state.Status === 'restarting') return <Pill paddingLeft={10} paddingRight={10} color="yellow" marginRight={8}>RE-STARTING</Pill>
    else return <Pill paddingLeft={10} paddingRight={10} color="neutral" marginRight={8}>{state.Status}</Pill>
  }

  render() {
    const {mouseHoveredOn} = this.state
    const containers = this.props.container.containers
    return Object.keys(containers).map((containerShortId, index) => {
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
}
const mapStateToProps = state => ({
  container: state.container
})
export default connect(mapStateToProps, null)(ContainerScreen)