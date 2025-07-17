import React from 'react'
import Navbar from './shared/Navbar'

const Commonlayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
        <Navbar />
        {children}
    </div>
  )
}

export default Commonlayout