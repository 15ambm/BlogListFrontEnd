import React from 'react'

const Notification = ({ data, color }) => {
  if(data) {
    return  (
      <div style={{color, borderStyle:'solid', padding:'6px'}}>
        {data} 
      </div>
    )
  } else return null
 }

export default Notification
