import React from 'react'
import Sidebar from './Sidebar'

function Container({children , className}) {
  return (
    <div className=' flex justify-between'>
        <Sidebar/>
        <div className={`${className}  overflow-y-scroll  w-full md:w-dynamic sm:pr-6 !px-4 pb-16 pt-20 mb-20 md:mb-0 md:py-10 md:!pr-10`}>
        {children}
        </div>
    </div>
  )
}

export default Container