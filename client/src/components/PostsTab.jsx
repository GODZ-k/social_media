import React from "react";
import Post from "./Post";

function PostsTab() {
  return (
    <div className=" w-full flex gap-2 flex-wrap">
      <Post/>
      <Post/>
      <Post/>

      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
    </div>
  );
}

export default PostsTab;
