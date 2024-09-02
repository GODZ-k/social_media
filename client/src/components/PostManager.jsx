import React, { useState } from "react";
import {CreatePost,CreatePostDesc} from "./CreatePost";

function PostManager() {
  const [currentTab, setCurrentTab] = useState(0);
  const [postData, setPostData] = useState({
    imageSelected: false,
    imageName: "",
    imageUrl: "",
    ratio: undefined,
  });

  const handleNext = () => {
    setCurrentTab((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentTab((prev)=> prev -  1)
  }

  return (
    <div>
      {currentTab === 0 && (
        <CreatePost
          onNext={handleNext}
          postData={postData}
          setPostData={setPostData}
        />
      )}
      {currentTab === 1 && <CreatePostDesc onBack={handleBack} postData={postData} setPostData={setPostData}
 />}
    </div>
  );
}

export default PostManager;
