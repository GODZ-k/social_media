import React from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Detailpost } from ".";

function Post({ type , className, post ,key }) {

  // console.log("post card post ====>", post)
  return <Dialog>
 <DialogTrigger>
 {type === "image" ? (
    <div key={key} className=" cursor-pointer rounded-xl overflow-hidden w-full h-28 sm:h-32 lg:h-36 xl:h-40 inline-block ">
      <img
        src={post?.image}
        loading="lazy"
        alt=""
        className=" w-full h-full object-center object-cover"
        srcset={post?.image}
      />
    </div>
  ) : (
    <div key={key} className={`${className} rounded-xl overflow-hidden w-full h-28 sm:h-32 lg:h-36 xl:h-40 inline-block`}>
      <video
        autoPlay
        loop
        className=" cursor-pointer w-full h-full object-center object-cover"
        muted
        poster="https://assets.codepen.io/6093409/river.jpg"
      >
        <source
          src="https://assets.codepen.io/6093409/river.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  )}
 </DialogTrigger>
  <Detailpost Post={post} />  
    </Dialog>
}

export default Post;
