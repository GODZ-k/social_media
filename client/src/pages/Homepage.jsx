import React from "react";
import {
  PostCard,
  Container as MainContainer,
  RightSuggestaion,
} from "../components";
import { Container } from "@chakra-ui/react";


function Homepage() {
  return (
    <MainContainer>
      {/* <Container> */}
      {/* <Suggestions/>   */}
      <div className=" flex justify-center gap-4 w-full">
        <div className=" w-[30rem] h-screen flex flex-col gap-11">
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
      {/* </Container> */}
    </MainContainer>
  );
}

export default Homepage;
