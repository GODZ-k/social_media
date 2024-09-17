import React from "react";

function Post({ type , className, post ,key }) {
  return type === "image" ? (
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
  );
}

export default Post;
