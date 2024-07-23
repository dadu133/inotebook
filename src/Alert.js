import React from 'react'

export default function Alert(props) {
  return (
   props.alert && <div style={{height:'7vh',backgroundColor:'#a2e6ad'}} className='container-Alert'>
      <strong className='p-1 text-xl'>{props.alert}</strong>
      
    </div>
  )
}