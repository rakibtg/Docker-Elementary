import {combineReducers} from 'redux'

import screens from './screen.reducer'

const rootReducer = combineReducers({
  screens,
})

export default rootReducer