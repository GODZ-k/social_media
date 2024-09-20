import React from "react";
import Post from "./Post";

function PostsTab({type , className, posts}) {

  // console.log(' post data ====> ',posts)

  return (
    <div className=" w-full grid gap-2 grid-cols-3 md:grid-cols-4 ">
      {
        posts && posts?.length >0 ? posts?.map((post)=>(
           <Post post={post} key={post?._id} className={className} type={type}/>
        ))
      :"No post found"}
    </div>
  );
}

export default PostsTab;
