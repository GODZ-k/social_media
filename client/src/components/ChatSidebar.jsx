import React from "react";
import { Container } from ".";
import AvatarImg from "./AvatarImg";
import { Link } from "react-router-dom";

function ChatSidebar() {
  return (
    <Container  isExpend={true}>
      <div className=" min-w-[280px]">
        <div className=" mb-6 flex justify-between items-center">
          <div className=" text-black font-bold text-sm">tanmaykhatri__</div>
          <div>
            <button>
              <i className="fa-regular fa-pen-to-square font-semibold"></i>
            </button>
          </div>
        </div>
        <div className=" flex flex-col gap-6 overflow-scroll h-[80vh]">
          <Link to="/direct/t/tanmaykhatri__" className=" flex items-center gap-3">
            <div className=" relative">
              <AvatarImg
                className={" !w-10 !h-10"}
                src={"https://github.com/shadcn.png"}
              />
              <div className=" absolute bottom-0 right-0 !text-[#2ed500] bg-green-800 rounded-full w-3 h-3">
                {" "}
              </div>
            </div>
            <div>
              <div className=" text-sm">Tanmay khatri</div>
              <div className=" text-xs text-gray-00">Active 48m ago</div>
            </div>
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default ChatSidebar;
