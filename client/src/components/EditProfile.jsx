import React, { useEffect, useState } from "react";
import { Container } from ".";
import AvatarImg from "./AvatarImg";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { updateAvatar, updateProfile , deleteAvatar } from "../../Api/ApiData";
import MiniLoader from "./MiniLoader";

function EditProfile() {
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  const [username, setUsername] = useState(user?.username || "");
  const [avatar, setAvatar] = useState(null || user?.avatar);
  const [selectedImage, setSelectedImage] = useState(null);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [gender, setGender] = useState(user?.gender || "");

  const handleGenderChange = (value) => {
    setGender(value);
  };

  const handleUpdateProfile = async () => {
    try {

      await updateProfile(
        {
          username,
          firstName,
          bio,
          gender,
        },
        setLoadingProfile
      );


    } catch (error) {
      console.log(error);
      setLoadingProfile(false);

    }finally{
        setLoadingProfile(false);
    }
  };

 
  const handleProfileImage = async () => {
    if (!selectedImage) return;

    try {
      setLoadingAvatar(true);

      await updateAvatar({
        avatar:selectedImage
      }, setLoadingAvatar);
    } catch (error) {
      console.log(error);
      setLoadingAvatar(false);

    } finally {
        setLoadingAvatar(false);

    }
  };

  const handleDeleteProfileImage = async () => {
    try {
      await deleteAvatar(dispatch, setLoadingAvatar);
    } catch (error) {
      console.log(error);
      setLoadingAvatar(false);

    } finally {
      setLoadingAvatar(false);

    }
  };

useEffect(() => {
    if (selectedImage) {
      const imagePreviewUrl = URL.createObjectURL(selectedImage);
      setAvatar(imagePreviewUrl);
      return () => URL.revokeObjectURL(imagePreviewUrl); // Cleanup
    }
  }, [selectedImage]);

  return (
    <Container>
      <div className="w-full flex justify-center">
        <div className=" w-full sm:w-3/5  h-full">
          <div className=" font-semibold text-xl text-black">Edit Profile</div>
          <div className=" my-10 flex justify-between items-center">
           <div className=" relative rounded-full flex justify-center items-center">
           <AvatarImg
              className={"!w-24 !h-24"}
              src={avatar}
              fallback={firstName[0].toUpperCase() || username[0].toUpperCase()}
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files[0])}
                className="absolute   inset-0 w-full h-full opacity-0 cursor-pointer"
                id="file-input"
              />
           </div>
            <Button className="!bg-blue-700" onClick={handleProfileImage} disabled={loadingAvatar}>{loadingAvatar ? <MiniLoader/> : "Update avatar"}</Button>
            <Button className=" !bg-red-700" onClick={handleDeleteProfileImage} disabled={loadingAvatar}>{loadingAvatar ? <MiniLoader/> : "Delete avatar"}</Button>
          </div>
          <div className="my-3">
            <Label htmlFor="name">Your name</Label>
            <Input
              className=" my-1"
              placeholder="Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="my-3">
            <Label htmlFor="username">Your username</Label>
            <Input
              className=" my-1"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="my-3">
            <Label htmlFor="username">bio</Label>
            <Textarea
              placeholder="Tell us a little bit about yourself"
              className="resize-none my-1"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="my-3">
            <Label htmlFor="username">Gender</Label>
            <div className=" my-1">
              <Select value={gender} onValueChange={handleGenderChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleUpdateProfile} className=" my-5">
            {loadingProfile ? <MiniLoader /> : " Update Profile"}
          </Button>
          <Button onClick={handleUpdateProfile} className=" !bg-red-700 m-5">
            {loadingProfile ? <MiniLoader /> : "Delete Account"}
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default EditProfile;
