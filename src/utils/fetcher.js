import {store} from '../index'
const {ipcRenderer} = window.require('electron')

export default (dataAction, loadingAction = null, errorAction = null, payloads = {}) => {
  store.dispatch(dataAction(payloads))
  if(loadingAction) store.dispatch(loadingAction())
  if(errorAction) store.dispatch(errorAction)
}