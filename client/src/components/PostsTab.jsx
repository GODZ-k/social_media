import React from "react";
import Post from "./Post";

function PostsTab({type , className}) {
  return (
    <div className=" w-full grid gap-2 grid-cols-3 md:grid-cols-4 ">
      <Post className={className} type={type}/>
      <Post className={className} type={type}/>
      <Post className={className} type={type}/>
      <Post className={className} type={type}/>
      <Post className={className} type={type}/>
      <Post className={className} type={type}/>
    </div>
  );
}

export default PostsTab;
