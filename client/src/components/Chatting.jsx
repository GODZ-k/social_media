import React, { useEffect, useLayoutEffect, useState } from "react";
import { Chat } from ".";
import AvatarImg from "./AvatarImg";
import { Input } from "./ui/input";
import EmojiPicker from "emoji-picker-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { IconButton } from "@mui/joy";
import { Face } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

function Chatting() {
  const [text, setText] = useState("");

  const messages = [
    {
      message:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo ipsam nam beatae deleniti nulla sed suscipit deserunt error ut non. Numquam, dolores quos cum ipsam architecto magnam placeat magni exercitationem distinctio fugiat excepturi nam autem hic molestiae cumque eligendi enim error, mollitia explicabo dolorum reprehenderit ratione quo libero. Doloremque, labore!",
      isRecived: true,
    },
    {
      message: " hello my name is tanmay and i am a ",
    },
    {
      message:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo ipsam nam beatae deleniti nulla sed suscipit deserunt error ut non. Numquam, dolores quos cum ipsam architecto magnam placeat magni exercitationem distinctio fugiat excepturi nam autem hic molestiae cumque eligendi enim error, mollitia explicabo dolorum reprehenderit ratione quo libero. Doloremque, labore!",
    },
    {
      message:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo ipsam nam beatae deleniti nulla sed suscipit deserunt error ut non. Numquam, dolores quos cum ipsam architecto magnam placeat magni exercitationem distinctio fugiat excepturi nam autem hic molestiae cumque eligendi enim error, mollitia explicabo dolorum reprehenderit ratione quo libero. Doloremque, labore!",
    },
    {
      message:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo ipsam nam beatae deleniti nulla sed suscipit deserunt error ut non. Numquam, dolores quos cum ipsam architecto magnam placeat magni exercitationem distinctio fugiat excepturi nam autem hic molestiae cumque eligendi enim error, mollitia explicabo dolorum reprehenderit ratione quo libero. Doloremque, labore!",
    },
    {
      message: "hello",
      isRecived: true,
    },
    {
      message: "hiiii",
      isRecived: true,
    },
  ];

  function handleComment(e) {
    const value = e.target.value;
    if (value.trim()) {
      setText(value);
    } else {
      setText("");
    }
  }

  
  return (
    <Chat>
        <div className=" w-full flex flex-col justify-between relative h-screen">
          <div className=" sticky z-50 top-0 left-0 w-full p-5 flex justify-between items-center border-b border-b-gray-300">
            <Link to="/profile/tanmaykhatri__">
              <div className=" flex items-center gap-2 font-semibold">
                <AvatarImg
                  src={"https://github.com/shadcn.png"}
                  className={" !w-10 !h-10"}
                />
                <div>Tanmay</div>
              </div>
            </Link>
            <div className=" flex items-center gap-5 text-lg">
              <div>
                <i className="fa-solid fa-phone"></i>
              </div>
              <div>
                <i className="fa-solid fa-video"></i>
              </div>
              <div>
                <i className="fa-solid fa-circle-exclamation"></i>
              </div>
            </div>
          </div>
          <div className=" w-full h-full overflow-y-scroll overflow-x-hidden">
            <div className=" flex flex-col gap-2 p-5 w-full  justify-center items-center">
              <AvatarImg
                src={"https://github.com/shadcn.png"}
                className=" !w-28 !h-28"
              />
              <div className=" text-center">
                <div className=" font-semibold">Tanmay</div>
                <div className=" text-sm text-gray-400">tanmaykhatri__</div>
              </div>
              <Link to="/profile/tanmaykhatri__">
                <Button className=" bg-gray-100 my-1 shadow-none hover:bg-gray-100 hover:text-gray-950 rounded-lg  text-gray-900">
                  View profile
                </Button>
              </Link>
            </div>
            <div className=" m-10">
              <ul className="w-full flex flex-col gap-6">
                {messages?.map((message, index) => (
                  <React.Fragment key={index}>
                    <Dialog>
                      <DialogTrigger className=" w-full p-0">
                        <li
                          key={index}
                          className={`${
                            message.isRecived ? "justify-start" : "justify-end"
                          } w-full   flex items-center`}
                        >
                          <div className=" max-w-96 text-start">
                            <div className=" rounded-2xl text-white  py-2 px-4 text-sm w-fit bg-blue-600">
                              <span>{message.message}</span>
                            </div>
                            <span
                              className={`${
                                message.isRecived
                                  ? "justify-start"
                                  : "justify-end"
                              } text-xs text-gray-400 w-full flex `}
                            >
                              3 Min ago
                            </span>
                          </div>
                        </li>
                      </DialogTrigger>
                      <DialogContent isClose={false}>
                        <li className=" list-none">
                          <button
                            className={
                              "text-red-600 w-full py-2 hover:bg-gray-50  border-b border-b-gray-300"
                            }
                          >
                            Delete
                          </button>
                        </li>
                        <li className=" list-none">
                          <button
                            className={
                              "text-gray-800 w-full py-2 hover:bg-gray-50  border-b border-b-gray-300"
                            }
                          >
                            Edit
                          </button>
                        </li>
                        <li className=" list-none">
                          <button
                            className={
                              "text-red-600 w-full py-2 hover:bg-gray-50"
                            }
                          >
                            Report
                          </button>
                        </li>
                      </DialogContent>
                    </Dialog>
                  </React.Fragment>
                ))}
              </ul>
            </div>
          </div>
          <div className=" sticky w-full bottom-0 left-0">
            <div className=" flex gap-2 p-2 rounded-3xl m-4 border border-gray-300">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <IconButton size="sm" variant="plain" color="neutral">
                    <Face />
                  </IconButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-0 h-96 rounded-md bg-none shadow-none border-none">
                  <EmojiPicker
                    lazyLoadEmojis={true}
                    onEmojiClick={(e) => setText((prev) => prev + e.emoji)}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
              <input
                type="text"
                value={text}
                onChange={handleComment}
                className=" w-full border-none bg-none shadow-none p-0 focus:outline-none focus:border-none focus:ring-0 "
              />
            </div>
          </div>
        </div>
    </Chat>
  );
}

export default Chatting;
