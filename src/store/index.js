import {createStore} from 'redux'
import initialState from './data'
import rootReducer from '../reducers'

export default () => createStore(rootReducer, initialState)