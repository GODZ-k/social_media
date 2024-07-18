import { MenuItem, MenuList, Portal, Menu, MenuButton } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function Postpage({
  title = "lest talk",
  postImage = "",
  replies = "sd",
  timestamp = "ads",
  comment = "asdas",
  like = "22",
  user = "Tanmay",
}) {
  return (
    <>
      <div className="flex gap-4 mt-3 mb-10">
        <div className=" flex flex-col w-full ">
          <div className=" flex justify-between">
            <div>
              <div className="flex gap-3 justify-start items-center">
                <div className=" mb-4 flex gap-5 items-center ">
                  <div className=" rounded-full overflow-hidden h-12 w-12">
                    <img
                      className=" w-full h-full object-center object-cover"
                      src=""
                      alt=""
                    />
                  </div>
                  <div className=" font-semibold">{user}</div>
                </div>
                <div className=" h-4 w-4">
                  <img src="bluetick.png" className=" w-full h-full" alt="" />
                </div>
              </div>
              <div className=" text-sm text-gray-300">{title}</div>
            </div>
            <div className=" flex gap-3 items-center justify-center">
              <div className=" text-gray-600">{timestamp}</div>
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
              src={postImage}
              alt=""
            />
          </div>
          <div className=" flex justify-between items-center my-1">
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
            <div className=" text-gray-300 text-sm">{comment} Comments</div>
          </div>
          <div className=" flex gap-7 text-sm text-gray-500 mt-2">
            <div>{replies} replies</div>
            <div>{like} Likes</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Postpage;
