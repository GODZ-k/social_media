import React from "react";
import { Container, RightSuggestaion } from ".";
import Post from "./Post";

function Explorepage_comp() {
  return (
    <Container>
      <div className=" font-semibold text-lg mb-6">
        Explore the Universe
      </div>
      <div className=" flex justify-between gap-4 w-full">
        <div className=" w-full sm:w-[50rem] h-screen flex flex-col gap-11">
          <div className=" w-full grid gap-2 grid-cols-3 md:grid-cols-4 ">
            <Post type={"image"} />
            <Post type={"video"} />
            <Post type={"image"} />
            <Post type={"video"} />
            <Post type={"image"} />
            <Post type={"video"} />
            <Post type={"video"} />
           
          </div>
        </div>
        <div className=" w-96 lg:block hidden h-fit">
          <RightSuggestaion />
        </div>
      </div>
    </Container>
  );
}

export default Explorepage_comp;
