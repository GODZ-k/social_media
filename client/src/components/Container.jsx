import React from 'react'
import Sidebar from './Sidebar'

function Container({children}) {
  return (
    <div className=' flex gap-2'>
        <Sidebar/>
        <div className=" w-dynamic">
        {children}
        </div>
    </div>
  )
}

export default Container