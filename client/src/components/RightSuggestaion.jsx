import { Card } from "flowbite-react";
import React from "react";
import Suggestions from "./Suggestions";
import UserShortCard from "./UserShortCard";

function RightSuggestaion() {
  return (
    <Card className=" w-full h-full">
      <UserShortCard type="logout" image="https://github.com/shadcn.png" username="tanmaykhatri__" name="tanmay khatri"/>
      <Suggestions />
    </Card>
  );
}

export default RightSuggestaion;
