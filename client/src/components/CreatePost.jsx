import React, { useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AspectRatio } from "@/components/ui/aspect-ratio";

function CreatePost() {
  const [imageSelected, setImageSelected] = useState(false);
  const [imageName, setImageName] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // Initially empty
  const [ratio , setRatio] = useState(undefined)

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageSelected(true);
      const file = e.target.files[0];
      setImageName(file.name);
      setImageUrl(URL.createObjectURL(file));
    }
  };


  const handleThemeChange = (value) => {
    if (value === "Original") {
      setRatio(undefined); // Reset to original aspect ratio
    } else {
      setRatio(Number(eval(value))); // Convert ratio to a number (e.g., 16/9)
    }
    console.log("Selected ratio:", value);
  };

  return (
    <DialogContent
      isClose={false}
      className={" overflow-hidden p-0 min-w-96 min-h-52 gap-0 "}
    >
      <div className={" flex w-full h-fit justify-between p-3"}>
        <button
          onClick={() => {
            setImageUrl("");
            setImageSelected(false);
            setRatio(undefined); // Reset ratio when clearing the image
            setImageName("");
          }}
          className="text-sm text-red-500 "
        >
          <i class="fa-solid fa-trash"></i>
        </button>
        <div className=" font-semibold">Create new post</div>
        <button className=" text-blue-500 font-semibold">Next</button>
      </div>
      <div className="h-full w-full flex  justify-center items-center">
        {imageSelected ? (
          <div className="  h-full w-full">
            <AspectRatio ratio={ratio}>
              <img
                src={imageUrl}
                alt={imageName}
                className=" w-full h-full object-cover object-center"
              />
            </AspectRatio>
          </div>
        ) : (
          <button className="relative bg-blue-500 text-white py-2 px-3 rounded-lg z-10">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              id="file-input"
            />
            Select from Computer
          </button>
        )}
      </div>
     {
      imageSelected && (
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
      )
     }
    </DialogContent>
  );
}

export default CreatePost;
