import error                from './error'
import screen               from './screen'
import nodesLog             from './nodesLog'
import container            from './container'
import {combineReducers}    from 'redux'

export default combineReducers({
  error,
  screen,
  nodesLog,
  container,
})