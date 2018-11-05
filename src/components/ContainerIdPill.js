import React from 'react'
import './ContainerIdPill.css'
import copy from 'copy-to-clipboard'
import { toaster } from 'evergreen-ui'

const ContainerIdPill = id => <div 
  className='container-id-pill' 
  title='Click to copy'
  onClick={() => {
    copy(id)
    toaster.notify('Copied to clipboard')
  }}>
  {id}
</div>

export default ContainerIdPill