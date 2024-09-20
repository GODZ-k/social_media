import React from "react";
import AvatarImg from "./AvatarImg";
import { logOutUser } from "../../Api/ApiData";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function UserShortCard({ key, type, name, username, image , className }) {
  const navigate =  useNavigate()
  const dispatch = useDispatch()

  async function handleLogout(){
    await logOutUser(dispatch,navigate)
  }
  return (
    <div key={key} className={`${className} flow-root my-4 md:my-0`}>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        <li className="py-1">
          <div className=" flex  justify-between items-center">
          <Link to={`/profile/${username}`}>
          <div className="flex items-center space-x-4">
           <div className="shrink-0">
              <AvatarImg src={image} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                {name}
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
              <button className="inline-flex items-center text-sm font-normal text-sky-600 dark:text-white">
                follow
              </button>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
}

export default UserShortCard;
