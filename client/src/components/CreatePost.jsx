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

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageSelected(true);
      const file = e.target.files[0];
      setImageName(file.name);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  return (
    <DialogContent
      isClose={false}
      className={" overflow-hidden p-0 min-w-96 min-h-52 gap-0 max-h-[90vh]"}
    >
      <div className={" flex w-full h-fit justify-between p-3"}>
        <button
          onClick={() => {
            setImageUrl("");
            setImageSelected(false);
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
            <AspectRatio ratio={16 / 9}>
              <img
                src={imageUrl}
                alt="Image"
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
      <div className=" flex gap-3 m-2">
        <button>Crop</button>
        <Select>
          <SelectTrigger className=" w-20">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </DialogContent>
  );
}

export default CreatePost;
