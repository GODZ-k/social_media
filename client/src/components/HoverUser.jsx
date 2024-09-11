import React from 'react'
import AvatarImg from './AvatarImg'
import { Button } from './ui/button'

function HoverUser() {
  return (
    <div className=' p-4'>
      <div className=' mb-2 font-semibold text-sm text-gray-500'>
        tanmaykhatri__
      </div>
        <div className=' flex gap-2 items-start'>
        <div>
          <AvatarImg src={"https://github.com/shadcn.png"} className={" !w-16 !h-16"}/>
        </div>
        <div className=' flex flex-col gap-2'>
        <div className=' text-sm gap-3 font-semibold flex justify-between items-center'>
          <div>
            200 Posts
          </div>
          <div>
            12.k Followers
          </div>
        </div>
        <div className=' flex gap-4 items-center'>
          <button className=" px-2 py-1 rounded-md bg-blue-600 flex gap-2 font-semibold items-center  text-xs text-white">
          <i class="fa-solid fa-message"></i> <span>Message</span>
          </button>
          <button className="  flex gap-2 font-semibold items-center px-2 py-1 rounded-md text-white text-xs bg-green-600">
          <i class="fa-solid fa-user-plus"></i><span>Follow</span>
          </button>
        </div>
        </div>
        </div>
        <div className=' my-2 flex flex-col gap-1'>
          <div className=' text-gray-800 text-sm'>
            Tanmay Khatri
          </div>
          <div className=' text-gray-700 text-sm'>
            hello this is my bio section
          </div>
        </div>
    </div>
  )
}

export default HoverUser