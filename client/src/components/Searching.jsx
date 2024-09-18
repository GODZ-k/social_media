import React, { useEffect, useState } from "react";
import UserShortCard from "./UserShortCard";
import { Input } from "./ui/input";
import { getAllUsers } from "../../Api/ApiData";
import { NoData } from ".";

function Searching() {
  const [users, setUsers] = useState([])
  const [input , setInput] = useState("")

  useEffect(()=>{
    getAllUsers(input,setUsers)
  },[input])
  return (
    <>
      <Input placeholder="Search" onChange={(e)=> setInput(e.target.value)} />
     {users && users?.length >0 ? users?.map((user)=>(
       <UserShortCard
       key={user?._id}
       name={user?.firstName}
       username={user?.username}
       image={user?.avatar}
       type={"follow"}
     />
     )): <NoData/>}
    </>
  );
}

export default Searching;
