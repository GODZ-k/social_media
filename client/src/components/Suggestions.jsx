import React, { useEffect, useState } from "react";
import UserShortCard from "./UserShortCard";
import { getAllSuggestions, getAllUsers } from "../../Api/ApiData";
import { NoData } from ".";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "@/redux/features/authSlice";

function Suggestions() {
  const loggedInUser = useSelector((state)=> state.auth.userData)
  const users = useSelector(state => state.auth.users)
  // const [users, setUsers] = useState([]);
  // const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
     (async()=>{
      const data = await getAllUsers('');
      console.log("data",data)
      dispatch(setUsers(data))
    })()
  }, [dispatch]);

  return (
    <>
      <div className="my-2 flex items-center justify-between">
        <h5 className="text-base  font-semibold leading-none text-gray-500 dark:text-white">
          Suggested to you
        </h5>
        <a
          href="#"
          className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
        >
          View all
        </a>
      </div>
      {users && users?.length > 0 ? (
        users?.map((user) => 
          user._id !== loggedInUser._id && (
            <UserShortCard
            key={user._id}
            type={"follow"}
            _id={user?._id}
            email={user?.email}
            firstName={user?.firstName}
            username={user?.username}
            avatar={user?.avatar}
            />
          )
        )
      ) : (
        <NoData />
      )}
    </>
  );
}

export default Suggestions;
