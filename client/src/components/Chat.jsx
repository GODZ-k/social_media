import React from "react";
import { ChatSidebar } from ".";
import { Link, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserShortCard from "./UserShortCard";

function Chat({ children }) {
  const { username } = useParams();
  console.log("username", username);
  return (
    <div className=" flex">
      <ChatSidebar />
      <>
        {username ? (
          children
        ) : (
          <div className=" flex justify-center items-center w-full h-screen">
            <div className=" flex flex-col gap-2 items-center justify-center">
              <div className="w-28">
                <img
                  className=" w-full h-full object-center object-cover"
                  src="/messenger.png"
                  alt="message"
                  srcset="/messenger.png"
                />
              </div>
              <Dialog>
                <DialogTrigger>
                  <Button className=" hover:bg-blue-500  bg-blue-600">
                    Send Message
                  </Button>
                </DialogTrigger>
                <DialogContent isClose={false}>
                 <Link to={'/direct/t/tanmaykhatri__'}>
                 <UserShortCard
                    _id='1111'
                    firstName='tanmay'
                    username='tanmaykhatri__'
                    avatar=''
                  />
                  </Link>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </>
    </div>
  );
}

export default Chat;
