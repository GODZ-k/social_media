import React, { memo, useEffect, useState } from "react";
import {
  PostCard,
  Container as MainContainer,
  RightSuggestaion,
} from "../components";
import { getAllPosts } from "../../Api/ApiData";
import { useDispatch, useSelector } from "react-redux";
import useRenderLogger from "@/components/RenderLogger";

const Homepage = memo(()=>{
  const dispatch = useDispatch();
  const feeds = useSelector((state) => state.posts);


  // console.log("all posts from redux ====> ",feeds)

  useEffect(() => {
     getAllPosts(dispatch);

    const interval = setInterval(() => {
      getAllPosts(dispatch);
    }, 20000);


    return ()=>clearInterval(interval)
  }, [dispatch]);

  useRenderLogger()
  return (
    <MainContainer>
      <div className=" flex justify-center gap-4 w-full">
        <div className=" w-full sm:w-[30rem] h-screen flex flex-col gap-11">
          {feeds && feeds?.length > 0 ? feeds?.map((feed)=>(
            <PostCard post={feed} />
          )) : "No post found"}
        </div>
        <div className=" w-96 lg:block hidden h-fit">
          <RightSuggestaion />
        </div>
      </div>
    </MainContainer>
  );
})

export default Homepage;
