import { Card } from "flowbite-react";
import React from "react";
import Suggestions from "./Suggestions";

function RightSuggestaion() {
  return (
    <Card className=" w-full h-full">
      <div className="flow-root h-fit">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <img
                  alt="Neil img"
                  height="32"
                  src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtNTMzLW5lb24tMDAzLmpwZw.jpg"
                  width="32"
                  className="rounded-full"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  Neil Sims
                </p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
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
