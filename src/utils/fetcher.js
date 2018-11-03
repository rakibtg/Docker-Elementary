import {store} from '../index'
const {ipcRenderer} = window.require('electron')

// const recipes = {
//   'active-containers': () => {
//     ipcRenderer.send('asynchronous-message', JSON.stringify({
//       type: 'fetch-containers',
//       options: {
//         filter,
//       }
//     }))
//     ipcRenderer.on('electron-to-react', this.handleElectronRequests.bind(this))
//   }
// }

export default async (source, action) => {
  setTimeout(async () => {
    const data = await source()
  }, 5000);
  console.log('Data from fetcher', data)
  // Collect all data to be set in a store.
  // Dispatch collected data in the store VIA action.
  // store.dispatch(dataAction(payloads))
  // if(loadingAction) store.dispatch(loadingAction())
  // if(errorAction) store.dispatch(errorAction)
}