import { MenuItem, MenuList, Portal, Menu, MenuButton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Postcomments from "../components/Postcomments";
import Detailpost from "../components/Detailpost";
import { getPost } from "../Api/ApiData";

function Postpage({}) {
  const [post, setPost] = useState({});
  const { username, pid } = useParams();

  useEffect(() => {
    getPost(setPost,pid);
  }, [username, pid]);

  console.log(post)
  return (
    <>
      <Detailpost  title = {post?.postTitle}
    postImage = {post?.image}
    timestamp = {post?.createdAt}
    comment = {post?.commnets?.length}
    like = {post?.likes}
    user = {username}
    />
      <div className=" border-y border-y-gray-800 py-5 flex justify-between items-center">
        <div className=" flex gap-2 text-gray-500">
          <div>👋</div>
          <div>Get the app to like , reply and post</div>
        </div>
        <button className=" py-2 px-3 bg-gray-800 font-semibold  text-gray-300 rounded-md">
          Get
        </button>
      </div>
      <Postcomments post={post} />
    </>
  );
}

export default Postpage;
