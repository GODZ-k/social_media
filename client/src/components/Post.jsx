import React from "react";

function Post({ type , className }) {
  return type === "image" ? (
    <div className=" rounded-xl overflow-hidden w-full h-28 sm:h-32 lg:h-36 xl:h-40 inline-block ">
      <img
        src="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800"
        loading="lazy"
        alt=""
        className=" w-full h-full object-center object-cover"
        srcset="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800&dpr=2 2x"
      />
    </div>
  ) : (
    <div className={`${className} rounded-xl overflow-hidden w-full h-36 sm:h-32 lg:h-36 xl:h-40 inline-block`}>
      <video
        autoPlay
        loop
        className=" w-full h-full object-center object-cover"
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
