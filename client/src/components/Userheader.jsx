import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Portal,
} from "@chakra-ui/react";
import { toast } from "react-toastify";

function Userheader() {
  function copyUrl() {
    const coppiedUrl = window.location.href;
    navigator.clipboard.writeText(coppiedUrl).then(() => {
      toast.success("Url coppied successfully");
    });
  }

  return (
    <>
      <div className=" flex flex-col">
        <div className=" flex justify-between">
          <div>
            <div className=" text-2xl font-sans font-semibold">Tanmay</div>
            <div className=" mt-2 text-sm flex gap-5 items-center">
              <div>tanmaykhatri__</div>
              <p className=" p-2 text-gray-500 bg-gray-900 rounded-md">
                threads.net
              </p>
            </div>
          </div>
          <div className=" w-32 h-32 overflow-hidden rounded-full flex justify-center items-center">
            <img
              className=" w-full object-center object-cover h-full"
              src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
              alt=""
            />
          </div>
        </div>
        <div>
          <div className=" my-3">
            Co-founder, executive chairmen and CEO of Meta Platforms
          </div>
        </div>
        <div className=" flex justify-between items-center">
          <div className=" flex gap-5 items-center text-gray-600 my-4 text-sm">
            <div>3.2K followers</div>
            <div>Instagram.com</div>
          </div>
          <div className=" flex gap-5 items-center">
            <div className="">
              <i className=" text-lg fa-brands fa-instagram"></i>
            </div>
            <div>
              <Menu>
                <MenuButton bg={"none"}>
                  <i className=" text-lg fa-solid fa-ellipsis-vertical"></i>
                </MenuButton>
                <Portal>
                  <MenuList background={"gray.dark"}>
                    <MenuItem background={"gray.dark"} onClick={copyUrl}>
                      {" "}
                      Copy link
                    </MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full flex py-2 items-center">
        <div className=" flex justify-center w-1/2 border-b-2 border-b-gray-600 py-3 cursor-pointer text-gray-300">
          Threads
        </div>
        <div className=" flex justify-center w-1/2 border-b border-b-gray-400 py-3 cursor-pointer text-gray-300">
          Replies
        </div>
      </div>
    </>
  );
}

export default Userheader;
