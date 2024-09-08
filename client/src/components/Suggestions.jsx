import React from 'react'
import UserShortCard from './UserShortCard';


function Suggestions() {
  return (
    <>
      <div className="my-2 flex items-center justify-between">
        <h5 className="text-base  font-semibold leading-none text-gray-500 dark:text-white">Suggested to you</h5>
        <a href="#" className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500">
          View all
        </a>
      </div>
     <UserShortCard type={'follow'} name="tanmay khatri" username={"tanmaykhatri__"} image={"https://github.com/shadcn.png"}/>
    </>
  )
}

export default Suggestions