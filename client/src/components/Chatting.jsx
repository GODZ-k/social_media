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
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { allMessages, getUser, sendMessage } from "../../Api/ApiData";
import { useDispatch, useSelector } from "react-redux";
import { setMessages, setNewMessage } from "@/redux/features/chatSlice";

function Chatting() {
  const [text, setText] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState({});
  const { identifier } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const messages = useSelector((state) => state.chat.messages);
  const loggedInUser = useSelector((state) => state.auth.userData);
  const { socket } = useSelector((state) => state.socket);

  function handleComment(e) {
    const value = e.target.value;
    if (value.trim()) {
      setText(value);
    } else {
      setText("");
    }
  }

  async function handleSendMessage() {
    try {
      await sendMessage(text, user?._id, setLoading);
      // console.log("new message", newMessage)
      // dispatch(setNewMessage(newMessage))
      setText("");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const handleNewMessage = (message) => {
      dispatch(setNewMessage(message));
    };

    socket?.on("newMessage", handleNewMessage);

    return () => {
      socket?.off("newMessage", handleNewMessage);
    };

  }, [dispatch, messages]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        await getUser(identifier, setUser);
        const messages = await allMessages(identifier, setLoading);
        dispatch(setMessages(messages));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [identifier, dispatch]);

  return (
    <Chat>
      <div className=" w-full flex flex-col justify-between relative h-screen">
        <div className=" sticky z-50 top-0 left-0 w-full p-5 flex justify-between items-center border-b border-b-gray-300 ">
          <Link to={`/profile/${user?.username}`}>
            <div className=" flex items-center gap-2 font-semibold">
              <div className="flex gap-5 items-center">
                <Link className=" text-gray-600" to={'/direct/inbox/'}><i className="fa-solid fa-chevron-left"></i></Link>
                <AvatarImg src={user?.avatar} className=" !w-10 !h-10" />
              </div>
              <div>{user?.username}</div>
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
            <AvatarImg src={user?.avatar} className=" !w-28 !h-28" />
            <div className=" text-center">
              <div className=" font-semibold">{user.firstName}</div>
              <div className=" text-sm text-gray-400">{user?.username}</div>
            </div>
            <Link to={`/profile/${user?.username}`}>
              <Button className=" bg-gray-100 my-1 shadow-none hover:bg-gray-100 hover:text-gray-950 rounded-lg  text-gray-900">
                View profile
              </Button>
            </Link>
          </div>
          <div className=" m-10">
            <ul className="w-full flex flex-col gap-6">
              {messages?.map((message) => (
                <React.Fragment key={message._id}>
                  <Dialog>
                    <DialogTrigger className=" w-full p-0">
                      <li
                        className={`${
                          message?.senderId !== loggedInUser?._id
                            ? "justify-start"
                            : "justify-end"
                        } w-full   flex items-center`}
                      >
                        <div className=" max-w-96 text-start">
                          <div className=" rounded-2xl text-white  py-2 px-4 text-sm w-fit bg-blue-600">
                            <span>{message.message}</span>
                          </div>
                          <span
                            className={`${
                              message?.senderId !== loggedInUser?._id
                                ? "justify-start"
                                : "justify-end"
                            } text-xs text-gray-400 w-full flex `}
                          >
                            {new Date(message.createdAt).toLocaleTimeString()}
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
            {text && (
              <button
                disabled={loading}
                onClick={handleSendMessage}
                className=" text-base text-blue-600 px-4 "
              >
                <i className="fa-regular fa-paper-plane"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </Chat>
  );
}

export default Chatting;
