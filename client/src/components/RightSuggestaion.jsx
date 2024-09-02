import { Card } from "flowbite-react";
import React from "react";
import Suggestions from "./Suggestions";
import AvatarImg from "./AvatarImg";

function RightSuggestaion() {
  return (
    <Card className=" w-full h-full">
      <div className="flow-root h-fit">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
               <AvatarImg src={"https://github.com/shadcn.png"}/>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                  Neil Sims
                </p>
                <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                  email@windster.com
                </p>
              </div>
              <button className=" cursor-pointer inline-flex items-center text-sm font-normal text-red-600 dark:text-white">
                Logout
              </button>
            </div>
          </li>
        </ul>
      </div>
      <Suggestions />
    </Card>
  );
}

export default RightSuggestaion;
