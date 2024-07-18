import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarBadge, AvatarGroup, Portal } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
function Userpost() {
  return (
    <>
      {/* <Link to={"/tanmay/post/1"} className=" hover:text-white"> */}
      <div className="flex gap-4 my-3">
        <div className=" flex flex-col items-center">
          <div className=" w-12 h-12">
            <img
              className=" w-full object-center object-cover h-full rounded-full"
              src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
              alt=""
            />
          </div>
          <div className=" w-[1px] h-full bg-gray-500 my-2"></div>
          <div className=" flex justify-center items-center">
            <AvatarGroup size="sm" max={2}>
              <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
              <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
              <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
              <Avatar
                name="Prosper Otemuyiwa"
                src="https://bit.ly/prosper-baba"
              />
              <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
            </AvatarGroup>
          </div>
        </div>
        <div className=" flex flex-col w-full ">
          <div className=" flex justify-between">
            <div>
              <div className="flex gap-3 justify-start items-center">
                <div className=" font-semibold">Tanmay</div>
                <div className=" h-4 w-4">
                  <img src="bluetick.png" className=" w-full h-full" alt="" />
                </div>
              </div>
              <div className=" text-sm text-gray-300">
                Let's talk about Threads
              </div>
            </div>
            <div className=" flex gap-3 items-center justify-center">
              <div className=" text-gray-600">1d</div>
              <div>
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
          </div>
          <div className=" w-full h-72 mt-3 mb-2 rounded-md overflow-hidden">
            <img
              className=" object-cover object-center w-full h-full"
              src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
              alt=""
            />
          </div>
          <div className=" flex justify-between items-center my-1">
            <div className="flex gap-5 cursor-pointer text-gray-300 text-[16px] md:text-lg">
              <div>
                <i class="fa-regular fa-heart"></i>
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
            <div className=" text-gray-300 text-sm">1.4K Comments</div>
          </div>
          <div className=" flex gap-7 text-sm text-gray-500 mt-2">
            <div>438 replies</div>
            <div>1200 Likes</div>
          </div>
        </div>
      </div>
      {/* </Link> */}
    </>
  );
}

export default Userpost;
