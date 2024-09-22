import React, { useEffect, useState } from "react";
import UserShortCard from "./UserShortCard";
import { getAllSuggestions } from "../../Api/ApiData";
import { NoData } from ".";
import { useSelector } from "react-redux";

function Suggestions() {
  const [users, setUsers] = useState([]);
const [loading,setLoading] = useState(false)

  useEffect(() => {
    getAllSuggestions(setUsers,setLoading);
  }, []);

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
        users?.map((user) => (
          <UserShortCard
            type={"follow"}
            _id={user?._id}
            email={user?.email}
            firstName={user?.firstName}
            username={user?.username}
            avatar={user?.avatar}
          />
        ))
      ) : (
        <NoData />
      )}
    </>
  );
}

export default Suggestions;
