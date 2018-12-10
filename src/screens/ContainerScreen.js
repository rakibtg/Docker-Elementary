import React, { Component } from 'react'
import './css/ContainerScreen.css'
import fetcher from '../utils/fetcher'
import { connect } from 'react-redux'
import { Switch, Strong, Pill, Button, Pane, Code, 
  Popover, Menu, toaster, Position, IconButton, Spinner } from 'evergreen-ui'
import ContainerIdPill from '../components/ContainerIdPill'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ContainerLiveStats from '../components/ContainerLiveStats/ContainerLiveStats'
import {bindActionCreators} from 'redux'
import { 
  setContainerInProgress,
  setContainerState
} from '../actions/container'
import LogViewer from '../components/LogViewer/LogViewer'
const { dialog } = window.require('electron').remote

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
    const twitterStyleTime = timeAgo.format(new Date(state.StartedAt), 'twitter')
    if(state.Status === 'running') return <Pill 
      paddingLeft={10} 
      paddingRight={10} 
      color="green" 
      marginRight={8}
      title={timeAgo.format(new Date(state.StartedAt))}
      textTransform='lowercase'>
      {twitterStyleTime.trim() === '' ? 'now' : twitterStyleTime}
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

  renderContainerFooter(container) {
    const [, name] = container.Name.split('/')
    return <Pane 
      display='flex'
      marginTop={12}>
      <Button 
        height={20} 
        marginRight={5} 
        iconBefore="refresh"
        onClick={() => {
          fetcher(
            'containerCmdAction', 
            {
              containerID: container.shortId, 
              cmdCommand: 'restart'
            }
          )
          setContainerState({
            containerID: container.shortId,
            updatable: { 
              Running: false,
              Restarting: true,
            }
          })
        }}>
        Restart
      </Button>
      <Button 
        height={20} 
        marginRight={5} 
        iconBefore={container.State.Running ? 'stop' : 'play'}
        onClick={() => {
          fetcher(
            'containerCmdAction', 
            {
              containerID: container.shortId, 
              cmdCommand: container.State.Running 
                ? 'stop'
                : 'start'
            }
          )
          setContainerState({
            containerID: container.shortId,
            updatable: { Running: !container.State.Running }
          })
        }}>
        {container.State.Running ? 'Stop' : 'Start'}
      </Button>
      <Button 
        height={20} 
        iconBefore="trash"
        onClick={() => {
          dialog.showMessageBox({
            type: 'warning',
            buttons: ['Delete', 'Cancel'],
            cancelId: 1,
            icon: null,
            message: 'Are you sure you want to delete?',
            detail: `You are about to delete ${name} container.`,
          }, async res => {
            if(!!!res) {
              await fetcher(
                'containerCmdAction', 
                {
                  containerID: container.shortId, 
                  cmdCommand: 'stop',
                  hideErrorDialog: true,
                }
              )
              fetcher(
                'containerCmdAction', 
                {
                  containerID: container.shortId, 
                  cmdCommand: 'rm'
                }
              )
            }
          })
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
                icon='clipboard'
                height={20}
                paddingTop={14}
                paddingBottom={14}
              >
                Logs
              </Menu.Item>
              <Menu.Item
                onSelect={() => toaster.notify('Share')}
                icon='info-sign'
                height={20}
                paddingTop={14}
                paddingBottom={14}
              >
                Info
              </Menu.Item>
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
    const { mouseHoveredOn } = this.state
    const { 
      setContainerInProgress, 
      setContainerState,
      inProgress
    } = this.props
    const containers = this.props.container.containers
    // console.log('inProgress', inProgress)
    return Object.keys(containers).map((containerShortId, index) => {
      const container = containers[containerShortId]
      // console.log(container)
      const isHovered = index === mouseHoveredOn
      const wrapperClass = isHovered ? 'container-list-wrapper active-list' : 'container-list-wrapper inactive-list'
      return <div key={index} className={wrapperClass}>
        <div className='container-list-left'>
          <Switch 
            marginLeft={16} 
            height={22} 
            checked={container.State.Running} 
            onChange={() => {
              fetcher(
                'containerCmdAction', 
                {
                  containerID: container.shortId, 
                  cmdCommand: container.State.Running 
                    ? 'stop'
                    : 'start'
                }
              )
              setContainerState({
                containerID: container.shortId,
                updatable: { Running: !container.State.Running }
              })
            }}
          />
        </div>
        <div className='container-list-body' onMouseEnter={() => this.handleMouseHover(index)}>
          <div className='container-list-inline'>
            { inProgress == containerShortId && <Spinner size={20} marginRight={10} /> }
            <Strong marginRight={16}>{container.Name.replace('/', '')}</Strong>
            {ContainerIdPill(container.shortId)}
            {this.renderHeadingStatus(container.State)}
            <ContainerLiveStats container={container.shortId}/>
          </div>
          {
            container.logData 
              ? container.logData
              : 'Nope'
          }
          {/* <LogViewer container={container.shortId}/> */}
          {
            isHovered && <div className='container-list-action-btn-wrapper'>
              {this.renderContainerFooter(container)}
            </div>
          }
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
  setContainerInProgress,
  setContainerState
}, dispatch )

export default connect(mapStateToProps, mapDispatchToProps)(ContainerScreen)