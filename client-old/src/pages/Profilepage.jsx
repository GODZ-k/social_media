import React, { useEffect, useState } from "react";
import Userheader from "../components/Userheader";
import Userpost from "../components/Userpost";
import { useSelector } from "react-redux";
import { getMypost } from "../Api/ApiData";

function Profilepage() {
    const [posts , setPosts] = useState([])
    const user = useSelector(state => state.auth.userData)

    useEffect(()=>{
        getMypost(setPosts)
    },[])

    console.log(posts);

  return (
    <>
      <Userheader user={user} />
      {posts?.map((post)=>(
        <Userpost
        postId={post?._id}
        likedBy={post?.likedBy}
        like={post?.likes}
        postImage={post?.image}
        comments={post?.comments.length}
        title={post?.postTitle}
        timestamp={post?.createdAt}
        avatar={user?.avatar}
        user={user?.username}
      />
      ))}
    </>
  );
}

export default Profilepage;
