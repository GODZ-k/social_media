import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import AvatarImg from "./AvatarImg";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { PostManager } from ".";
import SearchComp from "./SearchComp";
import { useSelector } from "react-redux";



function Sidebar() {
  const [openDialog, setOpenDialog] = useState(null); // Control which dialog is open
  const user = useSelector(state=> state.auth.userData)
  // console.log("user data on sidebar ===>" , user)

  const navItems = [
    {
      label: "Home",
      isMobile: true,
      icon: "https://cdn.lordicon.com/cnpvyndp.json",
      to: "/",
    },
    {
      label: "Search",
      icon: "https://cdn.lordicon.com/kkvxgpti.json",
      isPopUp: true,
      type:"search"
    },
    {
      label: "Create",
      isMobile: true,
      icon: "https://cdn.lordicon.com/hqymfzvj.json",
      isPopUp: true,
      type:"create"
    },
    {
      label: "Explore",
      isMobile: true,
      icon: "https://cdn.lordicon.com/xunzgeah.json",
      to: "/explore",
    },
    {
      label: "Reels",
      isMobile: true,
      icon: "https://cdn.lordicon.com/aklfruoc.json",
      to: "/reels",
    },
    {
      label: "Messages",
      icon: "https://cdn.lordicon.com/fdxqrdfe.json",
      to: "/chat",
    },
    {
      label: "Notification",
      icon: "https://cdn.lordicon.com/vspbqszr.json",
      to: "/notification",
    },
  
    {
      label: "Profile",
      isMobile: true,
      isProfile: true,
      to: `/profile/${user?.username}`,
    },
  ];
  
  
  function handleComponent(type) {
    setOpenDialog(type);
  }

  return (
    <>
      <Dialog open={!!openDialog} onOpenChange={() => setOpenDialog(null)}>
        <div className=" md:block hidden p-5  w-64 h-screen static top-0 left-0">
          <div className=" py-4">
            <div className=" w-40">
              {/* <Logo /> */}
            </div>
          </div>
          <div>
            <ul className=" flex flex-col gap-2">
              {navItems?.map((item, index) => (
                <DialogTrigger asChild>
                  {item.isPopUp ? (
                    <>
                      <button
                      onClick={() => handleComponent(item.type)}
                        className=" rounded-lg p-2 hover:bg-gray-100 flex items-center gap-3 w-full">
                        {" "}
                        <li key={index} className=" flex gap-4 items-center">
                          <div>
                              <lord-icon
                                src={item.icon}
                                trigger="in"
                                delay="1000"
                                style={{ width: "30px", height: "30px" }}
                                state="in-home"
                              ></lord-icon>
                          </div>
                          <div className="  text-lg">{item.label}</div>
                        </li>
                      </button>
                    </>
                  ) : (
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `${
                          !item.isPopUp && isActive
                            ? "bg-gray-100 text-gray-800"
                            : "bg-transparent"
                        } rounded-lg p-2 hover:bg-gray-100 flex items-center gap-3`
                      }
                    >
                      {" "}
                      <li key={index} className=" flex gap-4 items-center">
                        <div>
                          {item.isProfile ? (
                            <AvatarImg src={user?.avatar} fallback={user?.username[0]} />
                          ) : (
                            <lord-icon
                              src={item.icon}
                              trigger="in"
                              delay="1000"
                              style={{ width: "30px", height: "30px" }}
                              state="in-home"
                            ></lord-icon>
                          )}
                        </div>
                        <div className="  text-lg">{item.label}</div>
                      </li>
                    </NavLink>
                  )}
                </DialogTrigger>
              ))}
            </ul>
          </div>
        </div>
        {/* mobile */}
        <div className=" visible md:invisible block md:hidden fixed bottom-0 left-0 w-full px-3 py-3 z-10">
          <div className=" flex justify-evenly items-center w-full bg-gray-200 px-2 py-3 rounded-xl">
            <ul className=" flex justify-evenly items-center w-full">
              {navItems?.map(
                (item, index) =>
                  item.isMobile && (
                    <DialogTrigger asChild>
                      {item.isPopUp ? (
                        <>
                         <button
                          onClick={() => handleComponent(item.type)}
                        className=" rounded-lg p-2 hover:bg-gray-100 flex items-center gap-3 ">
                        {" "}
                        <li key={index} className=" flex gap-4 items-center">
                          <div>
                              <lord-icon
                                src={item.icon}
                                trigger="in"
                                delay="1000"
                                style={{ width: "30px", height: "30px" }}
                                state="in-home"
                              ></lord-icon>
                          </div>
                        </li>
                      </button>
                      </>
                      ) : (
                        <NavLink to={item.to} className=" text-gray-800">
                        {" "}
                        <li key={index} className=" flex gap-4 items-center">
                          <div>
                            {item.isProfile ? (
                              <img
                                className=" w-7 h-7 rounded-full"
                                src={item.icon}
                                alt="profile"
                              />
                            ) : (
                              <lord-icon
                                src={item.icon}
                                trigger="in"
                                delay="1000"
                                style={{ width: "30px", height: "30px" }}
                                state="in-home"
                              ></lord-icon>
                            )}
                          </div>
                        </li>
                      </NavLink>
                      )}
                    </DialogTrigger>
                  )
              )}
            </ul>
          </div>
        </div>
        {openDialog === "create" && (
            <PostManager />
        )}
        {openDialog === "search" && (
            <SearchComp />
        )}
      </Dialog>
    </>
  );
}

export default Sidebar;
