import React, { useEffect, useState } from "react";
import AvatarImg from "./AvatarImg";
import { followUnfollow, logOutUser } from "../../Api/ApiData";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function UserShortCard({ key, type,_id, firstName, username, avatar , email , className }) {
  const loggedinUser = useSelector(state => state.auth.userData)

  const navigate =  useNavigate()
  const dispatch = useDispatch()
  const [isFollowed , setIsFollowed] = useState(false)
  // const [isFollowed , setIsFollowed] = useState(loggedinUser?.following.some((user)=> user._id === _id) || false)
  const [loading , setLoading] = useState(false)

  async function handleLogout(){
    await logOutUser(dispatch,navigate)
  }

  useEffect(()=>{
    setIsFollowed(loggedinUser?.following.some((user)=> user._id === _id))
  },[loggedinUser])

  async function handleFollowUnfollow(){
    try{
      const user = {
        _id,
        username,
        avatar,
        email,
      }
      await followUnfollow(user ,  dispatch , setLoading)
      setIsFollowed(prev=> !isFollowed)
    }catch(error){
      // setIsFollowed(prev=> !isFollowed)
      console.log(error)
    }
  }

  return (
    <div key={key} className={`${className} flow-root my-4 md:my-0`}>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        <li className="py-1">
          <div className=" flex  justify-between items-center">
          <Link to={`/profile/${username}`}>
          <div className="flex items-center space-x-4">
           <div className="shrink-0">
              <AvatarImg src={avatar} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                {firstName}
              </p>
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                {username}
              </p>
            </div>
           </div>
           </Link>
            {type === "logout" ? (
              <button onClick={handleLogout} className="inline-flex items-center text-sm font-normal text-red-600 dark:text-white">
                Logout
              </button>
            ) : (
              <button onClick={handleFollowUnfollow} className={`${isFollowed ? 'text-red-600' : 'text-sky-600 dark:text-white'} inline-flex items-center text-sm font-normal `}>
                {isFollowed ? 'Unfollow' : ' follow'}
              </button>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
}

export default UserShortCard;
