import React from "react";
import { Container } from ".";
import AvatarImg from "./AvatarImg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function  ChatSidebar({className}) {
  const loggedInUser = useSelector(state => state.auth.userData)
  const onlineUsers = useSelector(state => state.chat.onlineUsers)
  const suggestedUsers = useSelector(state=>state.auth.users)



  return (
    <Container  isExpend={true} className={""}>
      <div className={`${className}  w-full md:min-w-[300px] md:max-w-[380px]`}>
        <div className=" mb-6 flex justify-between items-center">
          <div className=" text-black font-bold text-sm">{loggedInUser?.username}</div>
          <div>
            <button>
              <i className="fa-regular fa-pen-to-square font-semibold"></i>
            </button>
          </div>
        </div>
        <div className=" flex flex-col gap-6 overflow-scroll h-[80vh]">
        {suggestedUsers && suggestedUsers.length > 0 ? suggestedUsers.filter(user=> user._id !== loggedInUser._id)?.map((user)=> {
          const isOnline = onlineUsers.includes(user._id)
          return (
              <Link key={user._id} to={`/direct/t/${user._id}`} className=" flex items-center gap-3">
              <div className=" relative">
                <AvatarImg
                  className={" !w-10 !h-10"}
                  src={user?.avatar}
                />
                <div className={`${isOnline ? 'bg-green-500':"bg-red-600 "} absolute bottom-0 right-0 rounded-full w-3 h-3`}>
                </div>
              </div>
              <div>
                <div className=" text-sm">{user.firstName}</div>
                {
                  isOnline ? <div className=" text-xs text-green-500 font-semibold">Active now</div> : <div className=" text-xs text-gray-500 ">{user?.createdAt}</div>
                }
              </div>
            </Link>
          )
        }
        ): "no data found"}
        </div>
      </div>
    </Container>
  );
}

export default ChatSidebar;
