import React, { Component } from 'react'
import { SegmentedControl, Text, Icon, Badge } from 'evergreen-ui'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {setScreen} from '../actions/screen'

class ScreenNavigator extends Component {

  navButton (name, amount, icon) {
    return <Text display='flex' alignItems='center'>
      <Icon size={14} color="muted" icon={ icon } marginRight={5}/> 
        { name } 
        <Badge color="neutral" marginLeft={5}>
          { amount }
        </Badge>
    </Text>
  }

  render () {
    const {screen, setScreen} = this.props
    return <SegmentedControl
      width={750}
      height={50}
      options={[
        { label: this.navButton( 'Container', 29, 'layers' ), value: 'container' },
        { label: this.navButton( 'Image', 8, 'projects' ), value: 'image' },
        { label: this.navButton( 'Volume', 8, 'database' ), value: 'volume' },
        { label: this.navButton( 'Network', 8, 'cell-tower' ), value: 'network' },
        { label: this.navButton( 'Clean-up', 8, 'shield' ), value: 'cleanup' }
      ]}
      value={screen}
      onChange={value => setScreen(value)}
    />
  }
}

const mapStateToProps = state => ({
  screen: state.screen
})
const mapDispatchToProps = dispatch => bindActionCreators( {setScreen}, dispatch )
export default connect(mapStateToProps, mapDispatchToProps)(ScreenNavigator)