import React, { Component } from 'react'
import { Pane } from 'evergreen-ui'

import FilterContainers from './FilterContainers'
import ScreenNavigator from './ScreenNavigator'

class AppHeader extends Component {
  render() {
    return <div className='app-header'>
      <Pane display="flex" padding={16} background="tint1">
        <Pane display="flex">
        </Pane>
        <Pane flex={1} display="flex" alignItems="center" justifyContent="center">
          <ScreenNavigator/>
        </Pane>
      </Pane>
      <Pane display='flex' alignItems='center' justifyContent='center' padding={5} background='tint2'>
        <FilterContainers/>
      </Pane>
    </div>
  }
}

export default AppHeader