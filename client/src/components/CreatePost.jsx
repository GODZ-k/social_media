import React, { useEffect, useState } from "react";
import {
  DialogContent,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import AvatarImg from "./AvatarImg";
import { Button } from "./ui/button";

export function CreatePost({ onNext, setPostData, postData }) {
  const [imageSelected, setImageSelected] = useState(
    postData.imageSelected || false
  );
  const [imageName, setImageName] = useState(postData.imageName || "");
  const [imageUrl, setImageUrl] = useState(postData.imageUrl || "");
  const [ratio, setRatio] = useState(postData.ratio || undefined);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageSelected(true);
      const file = e.target.files[0];
      setImageName(file.name);
      setImageUrl(URL.createObjectURL(file));
      setPostData({
        imageSelected: true,
        imageName: file.name,
        imageUrl: URL.createObjectURL(file),
      });
    }
  };

  const handleThemeChange = (value) => {
    if (value === "Original") {
      setRatio(undefined); // Reset to original aspect ratio
      setPostData({
        ...postData,
        ratio: undefined,
      });
    } else {
      setRatio(Number(eval(value))); // Convert ratio to a number (e.g., 16/9)
      setPostData({
        ...postData,
        ratio: Number(eval(value)),
      });
    }
  };

  return (
    <DialogContent
      isClose={false}
      className={" overflow-hidden p-0 sm:min-w-96 min-h-52 gap-0 "}
    >
      <div className={" flex w-full h-fit justify-between p-3"}>
        <button
          onClick={() => {
            setImageUrl("");
            setImageSelected(false);
            setRatio(undefined); // Reset ratio when clearing the image
            setImageName("");
            setPostData({
              imageSelected: false,
              imageName: "",
              imageUrl: "",
              ratio: undefined,
            });
          }}
          className="text-sm text-red-500 "
        >
          <i class="fa-solid fa-trash"></i>
        </button>
        <div className=" font-semibold">Create new post</div>
        <button onClick={onNext} className=" text-blue-500 font-semibold">
          Next
        </button>
      </div>
      <div className="h-full w-full flex  justify-center items-center">
        {imageSelected ? (
          <div className=" h-full w-full transition-all ease-in-out duration-31000">
            <AspectRatio ratio={ratio}>
              <img
                src={imageUrl}
                alt={imageName}
                className=" w-full h-full object-cover object-center"
              />
            </AspectRatio>
          </div>
        ) : (
          <Button variant="outline" className="relative bg-blue-500 text-white py-2 px-3 rounded-lg z-10">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              id="file-input"
            />
            Select from Computer
          </Button>
        )}
      </div>
      {imageSelected && (
        <div className=" flex gap-3 m-2 ">
          {/* <button>Crop</button> */}
          <Select onValueChange={handleThemeChange} defaultValue="Original">
            <SelectTrigger className=" w-fit">
              <SelectValue placeholder="Aspect Ratio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Original">Original</SelectItem>
              <SelectItem value="16/9">16/9</SelectItem>
              <SelectItem value="1/1">1/1</SelectItem>
              <SelectItem value="4/5">4/5</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </DialogContent>
  );
}

export function CreatePostDesc({ onBack, postData ,setPostData }) {

  return (
    <DialogContent className={" overflow-hidden p-0 sm:min-w-96 min-h-32 gap-0 "}>
      <div className=" p-2">
        <div>
        <button className=" hover:bg-gray-200 rounded-md py-1 px-2" onClick={onBack}><i className="fa-solid fa-chevron-left"></i></button>
        </div>
        <div className=" mt-2 flex flex-col gap-4">
          <div className=" flex flex-col gap-2">
         {
          postData.imageUrl &&  <div className=" w-full h-64 rounded-xl overflow-hidden">
         {/* <AspectRatio ratio={16/9}> */}
         <img src={postData.imageUrl} className=" w-full h-full object-cover object-center" alt={postData.imageName} srcset="" />
         {/* </AspectRatio> */}
         </div>
         }
          <div className=" flex flex-col gap-2">
            <div className=" flex gap-2 items-center font-semibold">
            <AvatarImg src={"https://github.com/shadcn.png"}/>
            <p>tanmaykhatri__</p>
            </div>
            <textarea className=" min-h-40 w-full border-none resize-none placeholder:text-sm" placeholder="Enter your Comment" name="comment">

            </textarea>
          </div>
          </div>
          <div className=" flex gap-3">
          <button onClick={()=>  {
            setPostData({
              imageSelected: false,
              imageName: "",
              imageUrl: "",
              ratio: undefined,
            })
            onBack()
          }} className=" cursor-pointer w-fit bg-red-600 rounded-md py-2 px-4 text-white">Discard</button><button className=" cursor-pointer px-8 w-fit bg-blue-600 rounded-md py-2 text-white">Post</button>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
