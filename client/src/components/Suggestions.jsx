import React from 'react'
import { Card } from "flowbite-react";


function Suggestions() {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-base  font-normal leading-none text-gray-500 dark:text-white">Suggested to you</h5>
        <a href="#" className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500">
          View all
        </a>
      </div>
      <div className="flow-root">
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
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Neil Sims</p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@windster.com</p>
              </div>
              <button className="inline-flex items-center text-sm font-normal text-sky-600 dark:text-white">follow</button>
            </div>
          </li>
          
        </ul>
      </div>
    </>
  )
}

export default Suggestions