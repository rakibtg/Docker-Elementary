import React, { Component } from 'react'
import { Dialog, Text, Icon } from 'evergreen-ui'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { omitError } from '../../actions/error'

class ErrorHandler extends Component {

  render() {

    const { 
      error, 
      omitError
    } = this.props

    return <Dialog
      isShown={error.isError}
      title={error.title}
      onCloseComplete={() => omitError()}
      confirmLabel={error.confirmLabel}
      hasCancel={error.hasCancel}>
      {error.message}
    </Dialog>
  }
}

const mapStateToProps = state => ({
  error: state.error
})
const mapDispatchToProps = dispatch => bindActionCreators( { omitError }, dispatch )

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler)