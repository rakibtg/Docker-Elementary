import React, { Component } from 'react';
import './App.css';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getActiveScreen} from './actions/screen.action'

class App extends Component {

  componentDidMount() {
    console.log(this.props.activeScreen)
  }

  render() {
    return <div>hello world. {this.props.activeScreen}</div>
  }
}

const mapStateToProps = (state, ownProps) => ({ activeScreen: state.activeScreen })
const mapDispatchToProps = dispatch => (
  bindActionCreators({getActiveScreen: getActiveScreen}, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(App)