import React from "react";
import UserShortCard from "./UserShortCard";
import { Input } from "./ui/input";

function Searching() {
  return (
    <>
      <Input placeholder="Search" />
      <UserShortCard
        name="tanmay khatri"
        username={"tanmaykhatri__"}
        image={"https://github.com/shadcn.png"}
        type={"follow"}
      />
      <UserShortCard
        name="tanmay khatri"
        username={"tanmaykhatri__"}
        image={"https://github.com/shadcn.png"}
        type={"follow"}
      />
     
  
    </>
  );
}

export default Searching;
