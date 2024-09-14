import { Card } from "flowbite-react";
import React, { memo } from "react";
import Suggestions from "./Suggestions";
import UserShortCard from "./UserShortCard";
import { useSelector } from "react-redux";

const RightSuggestaion = memo(()=> {
  const user = useSelector(state=>state.auth.userData)
  return (
    <Card className=" w-full h-full">
      <UserShortCard type="logout" image={user?.avatar} username={user?.username} name="tanmay khatri"/>
      <Suggestions />
    </Card>
  );
})

export default RightSuggestaion;
