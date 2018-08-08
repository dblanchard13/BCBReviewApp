
import React from 'react'
import { Row, Col } from '../Grid'
import { Input } from '../Form'

const MessageInput = props => (
  <div className='input-group' style={{ bottom: 20, position: 'fixed', width: '55%' }}>
    <Input
      { ...props }
      name='messageDraft'
      placeholder=''
    />
     <span className="input-group-btn">
       <button
         className="btn btn-info"
         type="button"
         disabled={ !props.value }
         onClick={ props.sendMessage }
       >
         Send
       </button>
     </span>
    
  </div>

)

export default MessageInput
