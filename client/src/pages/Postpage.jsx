import { MenuItem, MenuList, Portal, Menu, MenuButton } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import Postcomments from "../components/Postcomments";
import Detailpost from "../components/Detailpost";

function Postpage({}) {
  return (
    <>
      <Detailpost/>
      <div className=" border-y border-y-gray-800 py-5 flex justify-between items-center">
        <div className=" flex gap-2 text-gray-500">
          <div>👋</div>
          <div>Get the app to like , reply and post</div>
        </div>
        <button className=" py-2 px-3 bg-gray-800 font-semibold  text-gray-300 rounded-md">
          Get
        </button>
      </div>
      <Postcomments/>
    </>
  );
}

export default Postpage;
