import React from 'react'
import AvatarImg from './AvatarImg'
import moment from 'moment/moment'

function Comment({username , comment ,  likes , time , avatar , isCaption }) {
  return (
    <div className={`${isCaption ? 'items-start' : 'items-center' } flex  space-x-4`}>
              <div className="shrink-0">
              <AvatarImg src={avatar}/>
              </div>
              <div className="min-w-0  gap-2 w-full">
                <div className={`${isCaption ? 'block' : 'flex'}  items-center gap-4`}>
                  <span className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                    {username}
                  </span>
                  <div>{comment}</div>
                </div>
                <div className=" text-sm flex gap-3">
                  <div className=" text-gray-600">{moment(time).fromNow()}</div>
                {likes &&   <div className=" font-semibold text-gray-700">{likes} likes</div>}
                </div>
              </div>
            </div>
  )
}

export default Comment