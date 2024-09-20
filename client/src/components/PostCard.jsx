import React, { memo, useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Face from "@mui/icons-material/Face";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import Detailpost from "./Detailpost";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ShareButton from "./ShareButton";
import CommentButton from "./CommentButton";
import LikeButton from "./LikeButton";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AvatarImg from "./AvatarImg";
import HoverComp from "./HoverComp";
import HoverUser from "./HoverUser";
import { TriggerOptions } from ".";
import EmojiPicker from "emoji-picker-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { editPost, insertComment, likePost, removePost } from "../../Api/ApiData";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MiniLoader from "./MiniLoader";



const PostCard = memo(({ post }) => {
  const user = useSelector(state => state.auth.userData)
  const [isLiked, setLiked] = useState(post?.likedBy.some(like => like.userId === user._id) || false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [title , setTitle] = useState(post?.postTitle || "")
  const [activeIndex, setActiveIndex] = useState(0); // Track active slide index
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post?.postTitle);
      setLiked(post?.likedBy.some((like) => like.userId === user._id) || false);
    }
  }, [post]); // Re-run this effect when 'post' changes

  // Close the dialog when loading becomes false
  useEffect(() => {
    if (!loading) {
      setIsOpen(false);
    }
  }, [loading]);

  function handleLike(){
    try {
      setLiked(prevLiked => !prevLiked); // Optimistically update the UI
      likePost(post._id,dispatch ,user,isLiked)
    } catch (error) {
      console.log(error)
      setLiked(prevLiked => !prevLiked); // Revert if the request fails

    }
  }

  function handleComment(e) {
    const value = e.target.value;
    if (value.trim()) {
      setText(value);
    } else {
      setText("");
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
        postTitle:title
      }
      await editPost(data,post._id , dispatch,setLoading)
    } catch (error) {
      console.log(error);
    }
  }

  async function handlePostComment(){
    try {
      const data = {
        'comment':text
      }
      await insertComment(data,post._id,dispatch,setLoading)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Dialog>
        <Card
          variant="plain"
          className=" border-b border-b-gray-300 shadow-md p-3 rounded-xl"
          sx={{
            minWidth: 300,
            "--Card-radius": (theme) => theme.vars.radius.xs,
          }}
        >
          <CardContent
            orientation="horizontal"
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <Link to={`/profile/${post?.createdBy?.username}`}>
            <HoverComp
            // onClick={handleRouteProfile}
              contentClass={" bg-white w-full p-0 "}
              content={<HoverUser user={post?.createdBy} />}
            >
              <div className=" flex gap-3 items-center">
                <Box
                  sx={{
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      m: "-2px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
                    },
                  }}
                >
                  <AvatarImg src={post?.createdBy?.avatar} />
                </Box>
                <Typography sx={{ fontWeight: "lg" }}>
                  {post?.createdBy?.username}
                </Typography>
              </div>
            </HoverComp>
            </Link>

            {/* <TriggerOptions items={options} loading={loading}>

            </TriggerOptions> */}
            <Dialog
              open={isOpen}
              onOpenChange={setIsOpen}
              className=" w-fit max-w-xl"
            >
              <DialogTrigger>
                <IconButton
                  variant="plain"
                  color="neutral"
                  size="sm"
                  sx={{ ml: "auto" }}
                >
                  <MoreHoriz />
                </IconButton>
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
                   {
                    post?.createdBy?._id === user?._id && (
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
                              {post.image && (
                                <div className=" w-full h-64 rounded-xl overflow-hidden">
                                  {/* <AspectRatio ratio={16/9}> */}
                                  <img
                                    src={post.image}
                                    className=" w-full h-full object-cover object-center"
                                    alt={post._id}
                                    srcset={post.image}
                                    loading="lazy"
                                  />
                                  {/* </AspectRatio> */}
                                </div>
                              )}
                              <div className=" flex flex-col gap-2">
                                <div className=" flex gap-2 items-center font-semibold">
                                  <AvatarImg src={post?.createdBy?.avatar} />
                                  <p>{post?.createdBy?.username}</p>
                                </div>
                                <textarea
                                  onChange={(e)=> setTitle(e.target.value )}
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
                                {loading ? <MiniLoader/> : "Update"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    )
                   }
                    <button
                      className={
                        "text-gray-800 w-full py-2 hover:bg-gray-50"
                      }
                    >
                      <li>Save</li>
                    </button>
                    {
                      post?.createdBy?._id === user?._id && (
                    <button
                      onClick={handleDelete}
                      className={"text-red-600 w-full py-2 hover:bg-gray-50  border-t border-t-gray-300"}
                    >
                      <li>{loading ? "Deleting ..." : "Delete"}</li>
                    </button>
                      )
                    }
                  </ul>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>

          {post.image ? (
            <CardOverflow className=" h-96 !p-0 -z-0">
              <div className=" h-full w-full">
                <Swiper
                  slidesPerView={1}
                  // spaceBetween={30}
                  // loop={true}
                  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  {/* {post?.map((hotel, index) => ( */}
                  <SwiperSlide>
                    <img
                      src={post?.image}
                      className=" w-full h-full object-cover object-center"
                      alt=""
                      srcset=""
                      loading="lazy"
                    />
                  </SwiperSlide>
                  {/* ))} */}
                </Swiper>
              </div>
            </CardOverflow>
          ) : (
            <Typography sx={{ fontSize: "sm" }}>
              {/* <Link
                component="button"
                color="neutral"
                textColor="text.primary"
                sx={{ fontWeight: "lg" }}
              >
              </Link>{" "} */}
              {post?.postTitle}
            </Typography>
          )}

          <div
          className=" flex justify-between items-center">
            <Box sx={{ width: 0, display: "flex", gap: 0.5,  }}>
              <IconButton onClick={handleLike} variant="plain" color="neutral" size="sm">
                <LikeButton isLiked={isLiked} />
              </IconButton>
              <DialogTrigger>
                <IconButton variant="plain" color="neutral" size="sm">
                  <CommentButton />
                </IconButton>
              </DialogTrigger>
              <IconButton variant="plain" color="neutral" size="sm">
                <ShareButton />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                mx: "auto",
              }}
            >
              {/* future update if single post have multiple images */}
              {/* {images.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    borderRadius: "50%",
                    width: activeIndex === index ? "6px" : "4px", // Increase size for active dot
                    height: activeIndex === index ? "6px" : "4px", // Increase size for active dot
                    bgcolor:
                      activeIndex === index
                        ? "primary.solidBg"
                        : "background.level3", // Change color for active dot
                  }}
                />
              ))} */}
            </Box>
            <Box
              sx={{ width: 0, display: "flex", flexDirection: "row-reverse" }}
            >
              <IconButton variant="plain" color="neutral" size="sm">
                <BookmarkBorderRoundedIcon />
              </IconButton>
            </Box>
          </div>
          <div className=" flex justify-start items-start gap-1 flex-col">
            <p
              className=" text-sm font-semibold"
            >
              {post?.likedBy.length} Likes
            </p>
            {post?.image && (
              <>
                <Typography sx={{ fontSize: "sm" }}>
                  {/* <Link
                component="button"
                color="neutral"
                textColor="text.primary"
                sx={{ fontWeight: "lg" }}
                >
                </Link>{" "} */}
                  {post?.postTitle}
                </Typography>

                <p
                 className=" text-sm text-gray-500"
                >
                  more
                </p>
              </>
            )}
            {post?.comments.length > 0 && (
              <DialogTrigger className=" text-start">
                <div
                  onClick={() => setIsCommentSection(true)

                  }
                >
                  View all {post?.comments.length} Comments
                </div>
              </DialogTrigger>
            )}
            <p className=" text-xs text-gray-500 font-medium">
              2 DAYS AGO
            </p>
          </div>
          <div className=" flex">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <IconButton
                  size="sm"
                  variant="plain"
                  color="neutral"
                  sx={{ ml: -1 }}
                >
                  <Face />
                </IconButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-0 h-96 rounded-md bg-none shadow-none border-none">
                <EmojiPicker
                  lazyLoadEmojis={true}
                  onEmojiClick={(e) => setText((prev) => prev + e.emoji)}
                />
              </DropdownMenuContent>
            </DropdownMenu>
            <Input
              variant="plain"
              size="sm"
              value={text}
              onChange={handleComment}
              placeholder="Add a comment…"
              sx={{ flex: 1, px: 0, "--Input-focusedThickness": "0px" }}
            />
            {text.length > 0 && (
              <button onClick={handlePostComment} className=" text-blue-600" underline="none" role="button">
                Post
              </button>
            )}
          </div>
        </Card>

        {/* detail post */}
        <Detailpost Post={post}/>
      </Dialog>
    </>
  );
});

export default PostCard;
