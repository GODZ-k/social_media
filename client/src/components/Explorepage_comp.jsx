import React, { useEffect } from "react";
import { Container, NoData, RightSuggestaion } from ".";
import Post from "./Post";
import { useSelector } from "react-redux";

function Explorepage_comp() {
  const posts = useSelector(state => state.posts)

  return (
    <Container>
      <div className=" font-semibold text-lg mb-6">
        Explore the Universe
      </div>
      <div className=" flex justify-between gap-4 w-full">
        <div className=" w-full sm:w-[50rem] h-screen flex flex-col gap-11">
          <div className=" w-full grid gap-2 grid-cols-3 md:grid-cols-4 ">
            {posts && posts?.length >0 ? posts?.map((post)=>(
              <Post post={post} key={post?._id} type={"image"} />
            )): <NoData/>
          }
            {/* <Post type={"video"} /> */}
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
