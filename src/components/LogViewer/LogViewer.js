import './LogViewer.css'
import React, { Component } from 'react'
import { 
  Pane, 
  Textarea, 
  IconButton, 
  Strong 
} from 'evergreen-ui'
import {closeLogExplorer} from '../../actions/nodesLog'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'


class LogViewer extends Component {

  // shouldComponentUpdate(nextProps) {
  //   const { nodesLog, container } = this.props
  //   const futureNodesLog = nextProps.nodesLog
  //   console.log('futureNodesLog', futureNodesLog)
  //   console.log('nodesLog', nodesLog)
  //   if(nodesLog.nodeID !== "") return true
  //   return futureNodesLog.nodeID === container
  // }

  render() {

    const { 
      nodesLog, 
      container, 
      closeLogExplorer 
    } = this.props

    if(nodesLog.nodeID !== container) return null

    return <Pane 
        width           = "100%" 
        display         = "flex" 
        position        = "relative"
        className       = "log-viewer-wrapper"
        flexDirection   = "column"
      >

      <Pane
        display     = "flex"
        className   = "log-view-header"
      >
        <Strong size={300} color="muted">{nodesLog.title}</Strong>
        <IconButton 
          top             = {0} 
          icon            = "cross" 
          right           = {0}
          height          = {18} 
          intent          = "danger"
          zIndex          = {9}
          position        = "absolute"
          marginTop       = {5}
          appearance      = "primary" 
          marginRight     = {25} 
          onClick         = {() => {
            closeLogExplorer()
          }}
        />
      </Pane>

      <Textarea 
        id        = "log-container" 
        wrap      = "off"
        readOnly  = "1"
        value     = {nodesLog.data}
      ></Textarea>
    </Pane>
  }
}

const mapStateToProps = state => {
  return {
    nodesLog: state.nodesLog
  }
}

const mapDispatchToProps = dispatch => bindActionCreators( { closeLogExplorer }, dispatch )

export default connect(mapStateToProps, mapDispatchToProps)(LogViewer)