import React, { Component } from 'react'
import './css/ContainerScreen.css'
import fetcher from '../utils/fetcher'
import { connect } from 'react-redux'
import { Switch, Strong, Pill, Button, Pane, 
  Popover, Menu, toaster, Position, IconButton } from 'evergreen-ui'
import ContainerIdPill from '../components/ContainerIdPill'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ContainerLiveStats from '../components/ContainerLiveStats/ContainerLiveStats'
import {bindActionCreators} from 'redux'
import { setContainerInProgress } from '../actions/container'

TimeAgo.locale(en)
const timeAgo = new TimeAgo('en-US')

class ContainerScreen extends Component {

  state = {
    mouseHoveredOn: -1,
  }

  async componentDidMount() {
    fetcher('getContainers', {filter: 'active'})
    fetcher('getContainerStats')
    setInterval(() => fetcher('getContainerStats'), 5000)
  }

  handleMouseHover(index) {
    this.setState({
      mouseHoveredOn: index
    })
  }

  renderHeadingStatus(state) {
    if(state.Status === 'running') return <Pill 
      paddingLeft={10} 
      paddingRight={10} 
      color="green" 
      marginRight={8}
      title={timeAgo.format(new Date(state.StartedAt))}
      textTransform='lowercase'>
      {timeAgo.format(new Date(state.StartedAt), 'twitter')}
    </Pill>
    else if(state.Status === 'restarting') return <Pill 
      paddingLeft={10} 
      paddingRight={10} 
      color="yellow" 
      marginRight={8}>RE-STARTING
    </Pill>
    else return <Pill 
      paddingLeft={10} 
      paddingRight={10} 
      color="neutral" 
      marginRight={8}
      title={timeAgo.format(new Date(state.StartedAt))}>{state.Status}
    </Pill>
  }

  renderContainerFooter() {
    return <Pane 
      display='flex'
      marginTop={12}>
      <Button height={20} marginRight={5} iconBefore="refresh">
        Restart
      </Button>
      <Button height={20} marginRight={5} iconBefore="stop">
        Stop
      </Button>
      {/* <Button height={20} marginRight={5} iconBefore='pause'>
        Pause
      </Button>
      <Button height={20} marginRight={5} iconBefore='ban-circle'>
        Kill
      </Button> */}
      {/* <Button height={20} marginRight={5} iconBefore='edit'>
        Rename
      </Button> */}
      {/* <Button height={20} marginRight={5} iconBefore='cell-tower'>
        Port
      </Button> */}
      <Button height={20} marginRight={5} iconBefore="clipboard">
        Logs
      </Button>
      {/* <Button height={20} marginRight={5} iconBefore="play">
        Start
      </Button> */}
      <Button 
        height={20} 
        iconBefore="info-sign"
        marginRight={5}>
        Info
      </Button>
      <Button 
        height={20} 
        iconBefore="trash"
        onClick={() => {
          alert('Are your sure you want to remove this container?')
        }}>
        Remove
      </Button>
      <Popover
        position={Position.BOTTOM_LEFT}
        content={
          <Menu>
            <Menu.Group>
              <Menu.Item
                onSelect={() => toaster.notify('Share')}
                icon='pause'
                height={20}
                paddingTop={14}
                paddingBottom={14}
              >
                Pause all processes
              </Menu.Item>
              <Menu.Item
                onSelect={() => toaster.notify('Move')}
                icon='ban-circle'
                height={20}
                paddingTop={14}
                paddingBottom={14}
              >
                Kill
              </Menu.Item>
              <Menu.Item
                onSelect={() => toaster.notify('Rename')}
                icon='edit'
                height={20}
                paddingTop={14}
                paddingBottom={14}
              >
                Rename
              </Menu.Item>
              <Menu.Item
                onSelect={() => toaster.notify('Rename')}
                icon='cell-tower'
                height={20}
                paddingTop={14}
                paddingBottom={14}
              >
                Port
              </Menu.Item>
            </Menu.Group>
          </Menu>
        }
      >
        <IconButton 
          height={20} 
          icon='cog'
          width={40}
          marginLeft={5}
        />
      </Popover>
    </Pane>
  }

  render() {
    const {mouseHoveredOn} = this.state
    const containers = this.props.container.containers
    return Object.keys(containers).map((containerShortId, index) => {
      const container = containers[containerShortId]
      // console.log('Container', JSON.stringify(container))
      // console.log('~~~~~~~~~~~~~~~~~~')
      const isHovered = index === mouseHoveredOn
      const wrapperClass = isHovered ? 'container-list-wrapper active-list' : 'container-list-wrapper inactive-list'
      return <div key={index} className={wrapperClass}>
        <div className='container-list-left'>
          <Switch 
            marginLeft={16} 
            height={22} 
            checked={container.State.Running} 
            onChange={() => {
              this.props.setContainerInProgress(container.shortId)
            }}
          />
        </div>
        <div className='container-list-body' onMouseEnter={() => this.handleMouseHover(index)}>
          <div className='container-list-inline'>
            <Strong marginRight={16}>{container.Name.replace('/', '')}</Strong>
            {ContainerIdPill(container.shortId)}
            {this.renderHeadingStatus(container.State)}
            <ContainerLiveStats container={container.shortId}/>
          </div>
          {
            isHovered && <div className='container-list-action-btn-wrapper'>
              {this.renderContainerFooter()}
            </div>
          }
          {/* <div className='container-list-footer'>
            From footer content
          </div> */}
        </div>
      </div>
    })
  }
}
const mapStateToProps = state => ({
  container: state.container,
  stats: state.container.stats,
  inProgress: state.container.inProgress
})

const mapDispatchToProps = dispatch => bindActionCreators( {
  setContainerInProgress
}, dispatch )

export default connect(mapStateToProps, mapDispatchToProps)(ContainerScreen)