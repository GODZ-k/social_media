import React from "react";
import Post from "./Post";

function PostsTab() {
  return (
    <div className=" w-full grid gap-2 grid-cols-3 md:grid-cols-4 ">
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
