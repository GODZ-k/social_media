import React from "react";
import AvatarImg from "./AvatarImg";

function UserShortCard({ type, name, username, image , className }) {
  return (
    <div className={`${className} flow-root my-4 md:my-0`}>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        <li className="py-1">
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
            {type === "logout" ? (
              <button className="inline-flex items-center text-sm font-normal text-red-600 dark:text-white">
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
