import React, { useEffect, useState } from "react";
import UserShortCard from "./UserShortCard";
import { getAllUsers } from "../../Api/ApiData";
import { NoData } from ".";
import { useSelector } from "react-redux";

function Suggestions() {
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    getAllUsers(input, setUsers);
  }, [input]);

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
            name={user?.firstName}
            username={user?.username}
            image={user?.avatar}
          />
        ))
      ) : (
        <NoData />
      )}
    </>
  );
}

export default Suggestions;
