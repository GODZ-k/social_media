import React, { useEffect, useState } from "react";
import { Container, RightSuggestaion } from ".";
import AvatarImg from "./AvatarImg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProfileTabs from "./ProfileTabs";
import { getUser, logOutUser } from "../../Api/ApiData";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const { username } = useParams();

  async function handleLogout() {
    try {
      await logOutUser(dispatch, navigate);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser(username, setUser);
  }, []);

  // console.log(user);
  return (
    <Container>
      <div className=" flex justify-between gap-4 w-full">
        <div className=" w-full h-screen flex flex-col gap-11">
          <div>
            <div className=" h-fit relative">
              <Dialog>
                <DialogTrigger className=" w-full">
                  <div className="  w-full h-[20vh] sm:h-[30vh] rounded-2xl overflow-hidden">
                    <img
                      src={user?.avatar}
                      className=" w-full h-full object-cover object-top"
                      alt=""
                      loading="lazy"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent
                  isClose={false}
                  className=" max-w-5xl p-2 bg-transparent  border-none flex justify-center items-center shadow-none w-full"
                >
                  <div className=" rounded-2xl  w-full h-96 overflow-hidden">
                    <img
                      src={user?.avatar}
                      className=" w-full h-full object-cover object-top"
                      alt=""
                      loading="lazy"
                    />
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger>
                  <div className=" absolute -bottom-6 sm:-bottom-12 lg:-bottom-14 left-1 sm:left-5">
                    <AvatarImg
                      src={user?.avatar}
                      className={
                        "lg:!h-40 !w-24 !h-24 sm:!w-36 sm:!h-36 lg:!w-40"
                      }
                    />
                  </div>
                </DialogTrigger>
                <DialogContent
                  isClose={false}
                  className=" bg-transparent border-none flex justify-center items-center shadow-none w-full"
                >
                  <div className=" h-60 w-60 ">
                    <AvatarImg
                      src={user?.avatar}
                      className={" !w-full !h-full"}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className=" mt-14 sm:mt-20 lg:mt-24 sm:px-6 flex flex-col gap-1">
              <div className=" flex items-center justify-between">
                <div className=" font-semibold text-lg">{user?.firstName}</div>
                <div className=" text-xl flex gap-4 items-center">
                  <button>
                    <i class="fa-brands fa-instagram"></i>
                  </button>
                  <button>
                    <i class="fa-brands fa-linkedin-in"></i>
                  </button>
                </div>
              </div>
              <div className=" text-sm text-gray-400">{user?.username}</div>
              <div className=" w-full sm:w-96 text-sm text-gray-600">
               {user?.bio}
              </div>
              <div className=" flex gap-4 my-2 font-semibold">
                <div>
                  <span className=" ">{user?.followers?.length}</span> followers
                </div>
                <div>
                  <span className="">{user?.following?.length}</span> following
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
                  <DropdownMenu>
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
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className={" text-red-600 font-semibold"}
                      >
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-full">
            <ProfileTabs posts={user?.posts} />
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
