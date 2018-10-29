import {store} from '../index'
const {ipcRenderer} = window.require('electron')

export default (dataAction, loadingAction = null, errorAction = null, payloads = {}) => {
  // Collect all data to be set in a store.
  // Dispatch collected data in the store VIA action.
  store.dispatch(dataAction(payloads))
  if(loadingAction) store.dispatch(loadingAction())
  if(errorAction) store.dispatch(errorAction)
}