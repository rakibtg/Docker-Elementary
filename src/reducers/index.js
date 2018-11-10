import {combineReducers} from 'redux'
import screen from './screen'
import container from './container'
import error from './error'
export default combineReducers({
  screen,
  container,
  error
})