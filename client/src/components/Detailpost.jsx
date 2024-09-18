import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Comment from "./Comment";
import { DialogTrigger } from "@radix-ui/react-dialog";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import ShareButton from "./ShareButton";
import Input from "@mui/joy/Input";
import AvatarImg from "./AvatarImg";
import { TriggerOptions } from ".";
import { useDispatch, useSelector } from "react-redux";
import { editPost, likePost, removePost } from "../../Api/ApiData";
import { useNavigate } from "react-router-dom";
import MiniLoader from "./MiniLoader";

const comments = [
  {
    username: "tanmaykhatri__",
    avatar:
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtNTMzLW5lb24tMDAzLmpwZw.jpg",
    likes: 12,
    time: 2,
    comment: "hii there",
  },
];


function Detailpost({ post }) {
  const user = useSelector((state) => state.auth.userData);
  const [isLiked, setLiked] = useState(
    post?.likedBy.some((like) => like.userId === user._id) || false
  );
  const [loading, setLoading] = useState(false);
  const [title , setTitle] = useState(post?.postTitle || "")
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleComment(e) {
    const value = e.target.value;
    if (value.trim()) {
      setText(value);
    } else {
      setText("");
    }
  }

  function handleLike() {
    try {
      setLiked((prevLiked) => !prevLiked); // Optimistically update the UI
      likePost(post._id, dispatch, user, isLiked);
    } catch (error) {
      console.log(error);
      setLiked((prevLiked) => !prevLiked); // Revert if the request fails
    }
  }

  async function handleDelete() {
    try {
      await removePost(post._id, dispatch, navigate, setLoading);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEdit() {
    try {
      const data = {
        postTitle: title,
      };
      await editPost(data, post._id, dispatch, setLoading);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <DialogContent className=" md:max-w-5xl w-full p-0 sm:h-auto h-full overflow-hidden">
      <div className=" h-full w-full bg-white gap-2 justify-between overflow-hidden flex">
        <div className=" h-full w-0 md:min-w-[25rem] md:visible invisible md:block hidden "></div>
        <div className=" w-full justify-between px-4 py-4 mt-4 flex flex-col">
          <div className=" w-full flex flex-col gap-4">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <AvatarImg src={post?.createdBy?.avatar} />
              </div>
              <div className="min-w-0 w-full flex justify-between">
                <div>
                  <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                    Neil Sims
                  </p>
                  <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                {/* post options */}
                <Dialog className=" w-fit max-w-xl">
                  <DialogTrigger>
                    <i className="fa-solid fa-ellipsis"></i>
                  </DialogTrigger>
                  <DialogContent
                    className=" max-w-xs rounded-xl py-2"
                    isClose={false}
                  >
                    <div className=" w-full">
                      <ul>
                        <button
                          className={
                            "text-red-600 w-full py-2 hover:bg-gray-50 border-b border-b-gray-300"
                          }
                        >
                          <li>Unfollow</li>
                        </button>
                        <button
                          className={
                            "text-gray-800 w-full py-2 hover:bg-gray-50 border-b border-b-gray-300"
                          }
                        >
                          <li>Copy link</li>
                        </button>
                        <button
                          className={
                            "text-gray-800 w-full py-2 hover:bg-gray-50 border-b border-b-gray-300"
                          }
                        >
                          <li>Report</li>
                        </button>
                        {/* edit post */}
                        {post?.createdBy?._id === user?._id && (
                          <Dialog>
                            <DialogTrigger className=" w-full">
                              <button
                                className={
                                  "text-gray-800 w-full py-2 hover:bg-gray-50 border-b border-b-gray-300"
                                }
                              >
                                <li>Edit</li>
                              </button>
                            </DialogTrigger>
                            <DialogContent
                              className={
                                " overflow-hidden p-0 sm:min-w-96 min-h-32 gap-0 "
                              }
                            >
                              <div className=" p-2">
                                {/* <div>
                            <button
                              className=" hover:bg-gray-200 rounded-md py-1 px-2"
                            >
                              <i className="fa-solid fa-chevron-left"></i>
                            </button>
                          </div> */}
                                <div className=" mt-2 flex flex-col gap-4">
                                  <div className=" flex flex-col gap-2">
                                    {post?.image && (
                                      <div className=" w-full h-64 rounded-xl overflow-hidden">
                                        <img
                                          src={post?.image}
                                          className=" w-full h-full object-cover object-center"
                                          alt={post?._id}
                                          srcset={post?.image}
                                          loading="lazy"
                                        />
                                      </div>
                                    )}
                                    <div className=" flex flex-col gap-2">
                                      <div className=" flex gap-2 items-center font-semibold">
                                        <AvatarImg
                                          src={post?.createdBy?.avatar}
                                        />
                                        <p>{post?.createdBy?.username}</p>
                                      </div>
                                      <textarea
                                        onChange={(e) =>
                                          setTitle(e.target.value)
                                        }
                                        value={title}
                                        className=" min-h-40 w-full border-none resize-none placeholder:text-sm"
                                        placeholder="Enter your Comment"
                                        name="comment"
                                      ></textarea>
                                    </div>
                                  </div>
                                  <div className=" flex gap-3">
                                    <button
                                      onClick={handleEdit}
                                      className=" cursor-pointer px-8 w-fit bg-blue-600 rounded-md py-2 text-white"
                                    >
                                      {loading ? <MiniLoader /> : "Update"}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                        <button
                          className={
                            "text-gray-800 w-full py-2 hover:bg-gray-50"
                          }
                        >
                          <li>Save</li>
                        </button>
                        {post?.createdBy?._id === user?._id && (
                          <button
                            onClick={handleDelete}
                            className={
                              "text-red-600 w-full py-2 hover:bg-gray-50  border-t border-t-gray-300"
                            }
                          >
                            <li>{loading ? "Deleting ..." : "Delete"}</li>
                          </button>
                        )}
                      </ul>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className=" flex flex-col gap-8 h-[69vh] overflow-y-scroll scrollbar-none">
              {/* caption */}
              <Comment
                username={post?.createdBy?.username}
                isCaption={true}
                comment={post?.postTitle}
                time={3}
                avatar={post?.createdBy?.avatar}
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
            <div className=" border-t border-t-gray-200 flex flex-col gap-1 pt-3 ">
              <div className=" flex gap-4">
                <LikeButton onClick={handleLike} isLiked={isLiked} />
                <ShareButton />
              </div>
              <div className=" text-sm font-semibold">
                {post?.likedBy?.length} likes
              </div>
              <div className=" text-sm text-gray-500">3 days ago</div>
              <div className=" flex w-full justify-between gap-2">
                <Input
                  variant="plain"
                  size="sm"
                  value={text}
                  onChange={handleComment}
                  placeholder="Add a comment…"
                  sx={{
                    flex: 1,
                    px: 0,
                    "--Input-focusedThickness": "0px",
                    background: "none",
                  }}
                />
                {text && (
                  <button className=" text-blue-500 text-sm">Post</button>
                )}
              </div>
            </div>
            {/* <div>login to like and comment</div> */}
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default Detailpost;
