import React from 'react'
import Sidebar from './Sidebar'

function Container({children}) {
  return (
    <div className=' flex gap-2'>
        <Sidebar/>
        <div className=" overflow-y-scroll  w-full md:w-dynamic sm:p-6 p-3 pb-16 pt-20 mb-20 md:mb-0 md:p-10">
        {children}
        </div>
    </div>
  )
}

export default Container