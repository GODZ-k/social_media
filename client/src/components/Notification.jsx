import React from "react";
import { Container, RightSuggestaion } from ".";
import { useSelector } from "react-redux";
import AvatarImg from "./AvatarImg";
import { Link } from "react-router-dom";

function Notification() {
  const notification = useSelector((state) => state.notification.notification);
  console.log(notification);
  return (
    <Container>
      <div className=" flex justify-between gap-4 w-full">

      <div className=" w-full h-full flex sm:justify-center">
        <div className=" w-96">
          <div className=" flex flex-col items-center gap-3">
            {notification && notification?.length > 0 ? (
              notification?.map((noti) => (
                <>
                  <Link to={`/profile/${noti.userId}`} className=" bg-gray-100 w-full rounded-xl p-3 flex gap-2 items-center">
                    <AvatarImg
                      src={noti?.userDetail?.avatar}
                      className={" !h-10 !w-10 object-center object-cover  border-red-300 border-2"}
                    />
                    <div className=" font-semibold text-sm">{noti?.message}</div>
                  </Link>
                </>
              ))
            ) : (
              <div>No notification found</div>
            )}
          </div>
        </div>
      </div>
      <div className=" w-96 min-w-96 lg:block hidden h-fit">
          <RightSuggestaion />
        </div>
        </div>
    </Container>
  );
}

export default Notification;
