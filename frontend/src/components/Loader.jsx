import React from 'react'
import  { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <Spinner 
        animation='border' 
        role='status' 
        style={{
          width: '100px',
          height: '100px',
          display: 'block'
        }}
      />
    </div>
  )
}

export default Loader