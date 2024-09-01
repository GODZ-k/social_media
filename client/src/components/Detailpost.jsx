import React from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import Comment from "./Comment";
import { DialogTrigger } from "@radix-ui/react-dialog";

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
function Detailpost() {
  return (
    <DialogContent className=" max-w-6xl p-0 m-0 overflow-hidden outline-none">
      <div className=" h-full w-full bg-white gap-2 justify-between overflow-hidden flex">
        <div className=" h-full w-0 md:min-w-[30rem] ">img</div>
        <div className=" w-full px-4 py-4 mt-4 flex flex-col">
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
                {/* post options */}
                <Dialog className=" w-fit max-w-xl">
                  <DialogTrigger>
                    <i className="fa-solid fa-ellipsis"></i>
                  </DialogTrigger>
                  <DialogContent className=" max-w-xs"  >
                    <div className=" w-full">
                      <ul>
                    
                      <button className=" w-full py-2 text-red-600 border-b border-b-gray-300">
                      <li>Delete</li>
                      </button>  <button className=" w-full py-2  border-b border-b-gray-300">
                      <li>Share</li>
                      </button>  <button className=" w-full py-2  border-b border-b-gray-300">
                      <li>Copy link</li>
                      </button>  <button className=" w-full pt-2">
                      <li>Delete</li>
                      </button>
                      </ul>
                    </div>
                  </DialogContent>
                </Dialog>
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
    </DialogContent>
  );
}

export default Detailpost;
