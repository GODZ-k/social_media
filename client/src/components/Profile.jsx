import React from "react";
import { Container, RightSuggestaion } from ".";
import AvatarImg from "./AvatarImg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProfileTabs from "./ProfileTabs";

function Profile() {
  return (
    <Container>
      <div className=" flex justify-between gap-4 w-full">
        <div className=" w-full h-screen flex flex-col gap-11">
          <div>
            <div className=" h-fit relative">
              <div className="  w-full h-[20vh] sm:h-[30vh] rounded-2xl overflow-hidden">
                <img
                  src="https://github.com/shadcn.png"
                  className=" w-full h-full object-cover object-top"
                  alt=""
                />
              </div>
              <div className=" absolute -bottom-12 sm:-bottom-16 lg:-bottom-20 left-1 sm:left-5">
                <AvatarImg
                  src={"https://github.com/shadcn.png"}
                  className={"lg:!h-40 !w-24 !h-24 sm:!w-36 sm:!h-36 lg:!w-40"}
                />
              </div>
            </div>
            <div className=" mt-14 sm:mt-20 lg:mt-24 sm:px-6 flex flex-col gap-1">
              <div className=" flex items-center justify-between">
                <div className=" font-semibold text-lg">Tanmay khatri</div>
                <div className=" text-xl flex gap-4 items-center">
                  <button>
                    <i class="fa-brands fa-instagram"></i>
                  </button>
                  <button>
                    <i class="fa-brands fa-linkedin-in"></i>
                  </button>
                </div>
              </div>
              <div className=" text-sm text-gray-400">tanmaykhatri__</div>
              <div className=" w-full sm:w-96 text-sm text-gray-600">
                hii these my name is tanmay and i am a full stack devloper || i
                Know react js mongoDB , express , node js
              </div>
              <div className=" flex gap-4 my-2 font-semibold">
                <div>
                  <span className=" ">6.5K</span> followers
                </div>
                <div>
                  <span className="">300</span> following
                </div>
              </div>
              <div className=" flex justify-between items-center">
                <div className=" flex gap-4 my-2">
                  <button className=" bg-blue-500 border border-blue-500 py-1 text-white px-3 rounded-md text-sm flex gap-2 items-center ">
                    <i className=" fa-solid fa-user-plus"></i>
                    <div>Follow</div>
                  </button>
                  <button className="  bg-white py-1 text-black px-3 border border-black rounded-md text-sm ">
                    Message
                  </button>
                </div>
                <div>
                  <DropdownMenu >
                    <DropdownMenuTrigger>
                      {" "}
                      <button>
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className=" mr-4">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-full">
            <ProfileTabs/>
          </div>
        </div>
        <div className=" w-96 lg:block hidden h-fit">
          <RightSuggestaion />
        </div>
      </div>
    </Container>
  );
}

export default Profile;
