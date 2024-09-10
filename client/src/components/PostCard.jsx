import React, { useState } from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import SendOutlined from "@mui/icons-material/SendOutlined";
import Face from "@mui/icons-material/Face";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import Detailpost from "./Detailpost";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
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

const images = [
  {
    src: "https://res.cloudinary.com/dlkzk9g9k/image/upload/v1725101426/WhatsApp_Image_2024-08-31_at_10.39.13_AM_1_ydad1h.jpg",
    content: "",
    to: "",
  },
  {
    src: "https://res.cloudinary.com/dlkzk9g9k/image/upload/v1725101343/WhatsApp_Image_2024-08-31_at_10.33.12_AM_2_bbdyxd.jpg",
    content: "",
    to: "",
  },
  {
    src: "https://res.cloudinary.com/dlkzk9g9k/image/upload/v1725101345/WhatsApp_Image_2024-08-31_at_10.33.14_AM_1_lbjnq5.jpg",
    content: "",
    to: "",
  },
  {
    src: "https://res.cloudinary.com/dlkzk9g9k/image/upload/v1725101424/WhatsApp_Image_2024-08-31_at_10.39.10_AM_1_z0t3p0.jpg",
    content: "",
    to: "",
  },
  {
    src: "https://res.cloudinary.com/dlkzk9g9k/image/upload/v1725101425/WhatsApp_Image_2024-08-31_at_10.39.09_AM_1_bnrtey.jpg",
    content: "",
    to: "",
  },
  {
    src: "https://res.cloudinary.com/dlkzk9g9k/image/upload/v1725101427/WhatsApp_Image_2024-08-31_at_10.39.12_AM_3_fxgqod.jpg",
    content: "",
    to: "",
  },
  {
    src: "https://res.cloudinary.com/dlkzk9g9k/image/upload/v1725101343/WhatsApp_Image_2024-08-31_at_10.33.11_AM_t4bacp.jpg",
    content: "",
    to: "",
  },
  {
    src: "https://res.cloudinary.com/dlkzk9g9k/image/upload/v1725101425/WhatsApp_Image_2024-08-31_at_10.39.11_AM_1_cifu4w.jpg",
    content: "",
    to: "",
  },
];

const options = [
  { name: "Copy link" },
  { name: "Report" },
  { name: "Comments" },
  { name: "Unfollow" },
  { name: "Save" },
  { name: "About this Account" },
  { name: "Delete" },
];

function PostCard() {
  const [isLiked, setLiked] = useState(true);
  const [text, setText] = useState("");
  const [activeIndex, setActiveIndex] = useState(0); // Track active slide index

  function handleComment(e) {
    const value = e.target.value;
    if (value.trim()) {
      setText(value);
    } else {
      setText("");
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
            }}
          >
            <HoverComp content={<HoverUser />}>
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
                  <AvatarImg src={"https://github.com/shadcn.png"} />
                </Box>
                <Typography sx={{ fontWeight: "lg" }}>
                  tanmaykhatri__
                </Typography>
              </div>
            </HoverComp>

            <TriggerOptions items={options}>
              <IconButton
                variant="plain"
                color="neutral"
                size="sm"
                sx={{ ml: "auto" }}
              >
                <MoreHoriz />
              </IconButton>
            </TriggerOptions>
          </CardContent>

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
                {images?.map((hotel, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={hotel.src}
                      className=" w-full h-full object-cover object-center"
                      alt=""
                      srcset=""
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </CardOverflow>
          <CardContent
            orientation="horizontal"
            sx={{ alignItems: "center", mx: -1 }}
          >
            <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
              <IconButton variant="plain" color="neutral" size="sm">
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
              {images.map((_, index) => (
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
              ))}
            </Box>
            <Box
              sx={{ width: 0, display: "flex", flexDirection: "row-reverse" }}
            >
              <IconButton variant="plain" color="neutral" size="sm">
                <BookmarkBorderRoundedIcon />
              </IconButton>
            </Box>
          </CardContent>
          <CardContent>
            <Link
              component="button"
              underline="none"
              textColor="text.primary"
              sx={{ fontSize: "sm", fontWeight: "lg" }}
            >
              8.1M Likes
            </Link>
            <Typography sx={{ fontSize: "sm" }}>
              <Link
                component="button"
                color="neutral"
                textColor="text.primary"
                sx={{ fontWeight: "lg" }}
              >
                MUI
              </Link>{" "}
              The React component library you always wanted
            </Typography>
            <Link
              component="button"
              underline="none"
              startDecorator="…"
              sx={{ fontSize: "sm", color: "text.tertiary" }}
            >
              more
            </Link>
            <DialogTrigger className=" text-start">
              <Link
                component="button"
                underline="none"
                onClick={() => setIsCommentSection(true)}
                sx={{ fontSize: "sm", color: "text.tertiary" }}
              >
                View all 122 Comments
              </Link>
            </DialogTrigger>
            <Link
              component="button"
              underline="none"
              sx={{ fontSize: "10px", color: "text.tertiary", my: 0.5 }}
            >
              2 DAYS AGO
            </Link>
          </CardContent>
          <CardContent orientation="horizontal" sx={{ gap: 1 }}>
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
                <EmojiPicker lazyLoadEmojis={true} onEmojiClick={(e)=> setText((prev)=> prev +  e.emoji)} />
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
              <button className=" text-blue-600" underline="none" role="button">
                Post
              </button>
            )}
          </CardContent>
        </Card>

        {/* detail post */}
        <Detailpost />
      </Dialog>
    </>
  );
}

export default PostCard;
