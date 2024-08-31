import React from "react";
import Comment from "./Comment";
const comments = [
  {
    username: "tanmaykhatri__",
    avatar:
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtNTMzLW5lb24tMDAzLmpwZw.jpg",
    likes: 12,
    time: 2,
    comment: "hii there",
  },
  {
    username: "tanmaykhatri__",
    avatar:
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtNTMzLW5lb24tMDAzLmpwZw.jpg",
    likes: 12,
    time: 2,
    comment: "hii there",
  },
  {
    username: "tanmaykhatri__",
    avatar:
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtNTMzLW5lb24tMDAzLmpwZw.jpg",
    likes: 12,
    time: 2,
    comment: "hii there",
  },
  {
    username: "tanmaykhatri__",
    avatar:
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtNTMzLW5lb24tMDAzLmpwZw.jpg",
    likes: 12,
    time: 2,
    comment: "hii there",
  },
  {
    username: "tanmaykhatri__",
    avatar:
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtNTMzLW5lb24tMDAzLmpwZw.jpg",
    likes: 12,
    time: 2,
    comment: "hii there",
  },
  {
    username: "tanmaykhatri__",
    avatar:
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtNTMzLW5lb24tMDAzLmpwZw.jpg",
    likes: 12,
    time: 2,
    comment: "hii there",
  },
  {
    username: "tanmaykhatri__",
    avatar:
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtNTMzLW5lb24tMDAzLmpwZw.jpg",
    likes: 12,
    time: 2,
    comment: "hii there",
  },
  {
    username: "tanmaykhatri__",
    avatar:
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtNTMzLW5lb24tMDAzLmpwZw.jpg",
    likes: 12,
    time: 2,
    comment: "hii there",
  },
  {
    username: "tanmaykhatri__",
    avatar:
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtNTMzLW5lb24tMDAzLmpwZw.jpg",
    likes: 12,
    time: 2,
    comment: "hii there",
  },
  {
    username: "tanmaykhatri__",
    avatar:
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtNTMzLW5lb24tMDAzLmpwZw.jpg",
    likes: 12,
    time: 2,
    comment: "hii there",
  },
  {
    username: "tanmaykhatri__",
    avatar:
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtNTMzLW5lb24tMDAzLmpwZw.jpg",
    likes: 12,
    time: 2,
    comment: "hii there",
  },
  {
    username: "tanmaykhatri__",
    avatar:
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtNTMzLW5lb24tMDAzLmpwZw.jpg",
    likes: 12,
    time: 2,
    comment: "hii there",
  },
  {
    username: "tanmaykhatri__",
    avatar:
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtNTMzLW5lb24tMDAzLmpwZw.jpg",
    likes: 12,
    time: 2,
    comment: "hii there",
  },
  {
    username: "tanmaykhatri__",
    avatar:
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtNTMzLW5lb24tMDAzLmpwZw.jpg",
    likes: 12,
    time: 2,
    comment: "hii there",
  },
  {
    username: "tanmaykhatri__",
    avatar:
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtNTMzLW5lb24tMDAzLmpwZw.jpg",
    likes: 12,
    time: 2,
    comment: "hii there",
  },
  {
    username: "tanmaykhatri__",
    avatar:
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtNTMzLW5lb24tMDAzLmpwZw.jpg",
    likes: 12,
    time: 2,
    comment: "hii there",
  },
  {
    username: "tanmaykhatri__",
    avatar:
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtNTMzLW5lb24tMDAzLmpwZw.jpg",
    likes: 12,
    time: 2,
    comment: "hii there",
  },
];
function Detailpost({ setIsCommentSection }) {
  return (
    <div className="  fixed inset-0  z-20 bg-[#000000ab] flex justify-center items-center px-8">
      <div className=" transition-transform duration-500 ease-in-out transform group-hover:scale-100 group-hover:opacity-100 bg-white h-[90%] md:w-[80rem] gap-2 justify-between flex rounded-lg overflow-hidden">
        <div className=" h-full w-0 md:min-w-[30rem] bg-black ">img</div>
        <div className=" w-full px-4 py-4 flex flex-col">
          <div className=" w-full flex flex-col gap-4">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <img
                  alt="Neil img"
                  height="35"
                  src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtNTMzLW5lb24tMDAzLmpwZw.jpg"
                  width="35"
                  className="rounded-full"
                />
              </div>
              <div className="min-w-0 w-full flex justify-between">
                <div>
                  <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                    Neil Sims
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <div>...</div>
              </div>
            </div>
            <div className=" flex flex-col gap-8 h-[69vh] overflow-y-scroll scrollbar-none">
              {/* caption */}
              <Comment
                username={"Qrdine"}
                isCaption={true}
                comment={"sfnsefnwenfweuifw ef"}
                time={3}
                avatar={
                  "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtNTMzLW5lb24tMDAzLmpwZw.jpg"
                }
              />
              {/* comments */}
              {comments && comments.length > 0
                ? comments?.map((comment) => (
                    <Comment
                      username={comment.username}
                      comment={comment.comment}
                      likes={comment.likes}
                      time={comment.likes}
                      avatar={comment.avatar}
                    />
                  ))
                : "No comment"}
            </div>
          </div>
         <div>
         <div className=" border-t border-t-gray-200 flex flex-col gap-1 py-3">
            <div className=" flex gap-4">
              <div>like</div>
              <div>comment</div>
              <div>share</div>
            </div>
            <div className=" text-sm font-semibold">34 likes</div>
            <div className=" text-sm text-gray-500">3 days ago</div>
          </div>
          {/* <div>login to like and comment</div> */}
         </div>
        </div>
      </div>
      <div className=" absolute top-2.5 right-4">
        <button
          onClick={() => setIsCommentSection(false)}
          className=" text-gray-200 text-2xl"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
}

export default Detailpost;
