import React from 'react'

export default function Alert(props) {
  return (
   props.alert && <div style={{height:'5vh',backgroundColor:'lightgreen'}} className='container-Alert'>
      <strong>{props.alert}</strong>
      
    </div>
  )
}