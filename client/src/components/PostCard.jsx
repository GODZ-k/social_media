import React, { useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
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

import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import ShareButton from "./ShareButton";
import CommentButton from "./CommentButton";
import LikeButton from "./LikeButton";

function PostCard() {
  const [isLiked , setLiked] = useState(true)
  const [text, setText] = useState("");

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
      <Dialog >
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
            sx={{ alignItems: "center", gap: 1 }}
          >
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
              <Avatar
                size="sm"
                src="/static/logo.png"
                sx={{
                  p: 0.5,
                  border: "2px solid",
                  borderColor: "background.body",
                }}
              />
            </Box>
            <Typography sx={{ fontWeight: "lg" }}>Username</Typography>
            <IconButton
              variant="plain"
              color="neutral"
              size="sm"
              sx={{ ml: "auto" }}
            >
              <MoreHoriz />
            </IconButton>
          </CardContent>
          <CardOverflow className=" h-96">
            {/* <AspectRatio sx={{ width: "100%", height: "auto" }}> */}
              <img
                className=" w-full h-full object-cover object-center"
                src="logo.png"
                alt=""
                loading="lazy"
              />
            {/* </AspectRatio> */}
          </CardOverflow>
          <CardContent
            orientation="horizontal"
            sx={{ alignItems: "center", mx: -1 }}
          >
            <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
              <IconButton variant="plain" color="neutral" size="sm">
                <LikeButton isLiked={isLiked}/>
              </IconButton>
              <DialogTrigger>
              <IconButton variant="plain" color="neutral" size="sm">
                <CommentButton/>
              </IconButton>
              </DialogTrigger>
              <IconButton variant="plain" color="neutral" size="sm">
                <ShareButton/>
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
              {[...Array(5)].map((_, index) => (
                <Box
                  key={index}
                  sx={[
                    {
                      borderRadius: "50%",
                      width: `max(${6 - index}px, 3px)`,
                      height: `max(${6 - index}px, 3px)`,
                    },
                    index === 0
                      ? { bgcolor: "primary.solidBg" }
                      : { bgcolor: "background.level3" },
                  ]}
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
            <IconButton
              size="sm"
              variant="plain"
              color="neutral"
              sx={{ ml: -1 }}
            >
              <Face />
            </IconButton>
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
     <Detailpost  />
        
      </Dialog>
    </>
  );
}

export default PostCard;
