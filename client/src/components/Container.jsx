import React from 'react'
import Sidebar from './Sidebar'

function Container({children , className , isExpend}) {

  return (
    <div className='flex justify-between md:w-fit w-full'>
        <Sidebar isExpend={isExpend}/>
        <div className={`${className} ${!isExpend && 'w-dynamic'}  overflow-y-scroll  w-full sm:pr-6 !px-4 pb-16 pt-20 mb-20 md:mb-0 md:py-10 md:!pr-10`}>
        {children}
        </div>
    </div>
  )
}

export default Container