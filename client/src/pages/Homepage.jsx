/* eslint-disable react/display-name */
import { memo, useCallback } from "react";
import {
  PostCard,
  Container as MainContainer,
  RightSuggestaion,
  NoData,
} from "../components";
import PullToRefresh from 'react-simple-pull-to-refresh';
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../Api/ApiData";

const Homepage = memo(()=>{
  const feeds = useSelector((state) => state.posts);
  const dispatch = useDispatch()

  const handleRefresh = useCallback(() => {
    return new Promise((resolve) => {
      console.log("Refreshing posts..."); // Debugging log
      getAllPosts(dispatch); // Dispatch the action to fetch posts
      // Manually scroll to the top after refresh
      window.scrollTo(0, 0);
      resolve(); // Resolve the promise after fetching data
    });
  }, [dispatch]);


  return (
    <PullToRefresh
    onRefresh={handleRefresh}
  >
    <MainContainer>
      <div className=" flex justify-center gap-4 w-full">
        <div className=" w-full sm:w-[30rem] h-screen flex flex-col gap-11">
          {feeds && feeds?.length > 0 ? feeds?.map((feed)=>(
            <PostCard key={feed._id} post={feed} />
          )) : <NoData/>}
        </div>
        <div className=" w-96 lg:block hidden h-fit">
          <RightSuggestaion />
        </div>
      </div>
    </MainContainer>
  </PullToRefresh>
  );
})

export default Homepage;
