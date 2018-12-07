import './LogViewer.css'
import React, { Component } from 'react'
import { 
  Pane, 
  Textarea, 
  IconButton, 
  Strong 
} from 'evergreen-ui'
import { connect } from 'react-redux'

class ContainerLiveStats extends Component {

  render() {

    const { container } = this.props

    return <Pane 
        width         = "100%" 
        display       = "flex" 
        position      = "relative"
        className     = "log-viewer-wrapper"
        flexDirection = "column"
      >

      <Pane
        display = "flex"
        className= "log-view-header"
      >
        <Strong size={300} color="muted">LOGS</Strong>
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
        />
      </Pane>


      <Textarea 
        id        = "log-container" 
        wrap      = "off"
        readonly  = "1"
      >
{`Helo memeek
  ok?
      there`}
      </Textarea>
    </Pane>
  }
}

const mapStateToProps = state => ({
  stats: state.container.stats
})
export default connect(mapStateToProps, null)(ContainerLiveStats)