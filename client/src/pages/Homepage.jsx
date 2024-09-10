import React, { useState } from "react";
import {
  PostCard,
  Container as MainContainer,
  RightSuggestaion,
} from "../components";


function Homepage() {
  
  return (
    <MainContainer>
      <div className=" flex justify-center gap-4 w-full">
        <div className=" w-full sm:w-[30rem] h-screen flex flex-col gap-11">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
        <div className=" w-96 lg:block hidden h-fit">
          <RightSuggestaion />
        </div>
      </div>
    </MainContainer>
  );
}

export default Homepage;
