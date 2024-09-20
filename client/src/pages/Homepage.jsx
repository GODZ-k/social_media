import React, { memo, useEffect, useState } from "react";
import {
  PostCard,
  Container as MainContainer,
  RightSuggestaion,
  NoData,
} from "../components";
import { useSelector } from "react-redux";
import useRenderLogger from "@/components/RenderLogger";

const Homepage = memo(()=>{
  const feeds = useSelector((state) => state.posts);

  
  useRenderLogger()
  return (
    <MainContainer>
      <div className=" flex justify-center gap-4 w-full">
        <div className=" w-full sm:w-[30rem] h-screen flex flex-col gap-11">
          {feeds && feeds?.length > 0 ? feeds?.map((feed)=>(
            <PostCard post={feed} />
          )) : <NoData/>}
        </div>
        <div className=" w-96 lg:block hidden h-fit">
          <RightSuggestaion />
        </div>
      </div>
    </MainContainer>
  );
})

export default Homepage;
