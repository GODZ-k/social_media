import React from 'react'
import Sidebar from './Sidebar'

function Container({children}) {
  return (
    <div className=' flex'>
        <Sidebar/>
        <div className=" overflow-y-scroll  w-full md:w-dynamic sm:pr-6 !px-3 pb-16 pt-20 mb-20 md:mb-0 md:py-10 md:!pr-10">
        {children}
        </div>
    </div>
  )
}

export default Container