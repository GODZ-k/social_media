import { Menu, MenuButton, MenuItem, MenuList, Portal } from '@chakra-ui/react'
import React from 'react'

function Postcomments() {
  return (
    <div className=" border-b border-b-gray-800 flex gap-5 py-4">
        <div className=" rounded-full overflow-hidden w-11 h-10">
          <img
            className=" h-full w-full object-center object-cover"
            src="/public/bluetick.png"
            alt=""
          />
        </div>
        <div className=" flex flex-col gap-2 w-full">
          <div className=" flex justify-between items-start">
            <div>
              <div className=' flex gap-2 items-center'>
                <div className=' font-semibold'>
                    Tanmay
                </div>
                <div className=' h-4 w-4 '>
                    <img className=' w-full h-full' src="/public/bluetick.png" alt="" />
                </div>
              </div>
              <div className=" text-gray-400 text-sm">
                I love this post Looks like really cool .
              </div>
            </div>
            <div className=' flex gap-4 items-center'>
              <div className=' text-gray-600'>
1d
              </div>
              <Menu>
                <MenuButton bg={"none"}>
                  <i className=" text-gray-300 fa-solid fa-ellipsis"></i>
                </MenuButton>
                <Portal>
                  <MenuList background={"gray.dark"}>
                    <MenuItem background={"gray.dark"}>Edit</MenuItem>
                    <MenuItem background={"gray.dark"}>Delete</MenuItem>
                    <MenuItem background={"gray.dark"}>Copy link</MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
              
            </div>
          </div>
          <div className=" flex justify-between items-center">
            <div className="flex gap-5 cursor-pointer text-gray-300 text-[16px] md:text-lg">
              <div>
                <i className=" text-red-800 fa-regular fa-heart"></i>
              </div>
              <div>
                <i class="fa-regular fa-comment"></i>
              </div>
              <div>
                <i class="fa-solid fa-repeat"></i>
              </div>
              <div>
                <i class="fa-regular fa-paper-plane"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Postcomments