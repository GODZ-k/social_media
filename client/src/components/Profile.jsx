import { useEffect, useState } from "react";
import { Container, ProtectUserContent, RightSuggestaion } from ".";
import AvatarImg from "./AvatarImg";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProfileTabs from "./ProfileTabs";
import { followUnfollow, getUser, logOutUser } from "../../Api/ApiData";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import MiniLoader from "./MiniLoader";

function Profile() {
  const loggedInUser = useSelector(state=> state.auth.userData)
  const { username } = useParams();
  const [loading , setLoading] = useState(false)
  const [user, setUser] = useState({});
  const [isFollowed, setIsFollowed] = useState(false); // Initialize as false
  // const [isFollowed , setIsFollowed] = useState(loggedInUser?.following.some((loggedInUser)=> loggedInUser?._id === user?._id) || false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("islogged in",  loggedInUser, user )
  async function handleLogout() {
    try {
      await logOutUser(dispatch, navigate);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    if(user && loggedInUser){
      setIsFollowed(loggedInUser?.following.some((followedUser) => followedUser._id === user._id))
    }
  },[user, loggedInUser])

  useEffect(() => {
    getUser(username, setUser);
  }, [navigate,loggedInUser,username]);

  async function handleFollowUnfollow(){
    setLoading(true); 
    try{
      await followUnfollow(user, dispatch, setLoading);
      setIsFollowed(prev => !prev); 
    } catch(error){
      console.log(error);
    } finally {
      setLoading(false); 
    }
  }

  return (
    <Container>
      <div className=" flex justify-between gap-4 w-full">
        <div className=" w-full h-screen flex flex-col gap-11">
          <div>
            <div className=" h-fit relative">
              <Dialog>
                <DialogTrigger className=" w-full">
                  <div className="  w-full h-[20vh] sm:h-[30vh] rounded-2xl overflow-hidden">
                    <img
                      src={user?.avatar}
                      className=" w-full h-full object-cover object-top"
                      alt=""
                      loading="lazy"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent
                  isClose={false}
                  className=" max-w-5xl p-2 bg-transparent  border-none flex justify-center items-center shadow-none w-full"
                >
                  <div className=" rounded-2xl  w-full h-96 overflow-hidden">
                    <img
                      src={user?.avatar}
                      className=" w-full h-full object-cover object-center"
                      alt=""
                      loading="lazy"
                    />
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger>
                  <div className=" absolute -bottom-6 sm:-bottom-12 lg:-bottom-14 left-1 sm:left-5">
                    <AvatarImg
                      src={user?.avatar}
                      className={
                        "lg:!h-40 !w-24 !h-24 sm:!w-36 sm:!h-36 lg:!w-40 object-cover object-center"
                      }
                    />
                  </div>
                </DialogTrigger>
                <DialogContent
                  isClose={false}
                  className=" bg-transparent border-none flex justify-center items-center shadow-none w-full"
                >
                  <div className=" h-60 w-60 ">
                    <AvatarImg
                      src={user?.avatar}
                      className={" !w-full !h-full object-cover object-center"}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className=" mt-14 sm:mt-20 lg:mt-24 sm:px-6 flex flex-col gap-1">
              <div className=" flex items-center justify-between">
                <div className=" font-semibold text-lg">{user?.firstName}</div>
                <div className=" text-xl flex gap-4 items-center">
                  <button>
                    <i className="fa-brands fa-instagram"></i>
                  </button>
                  <button>
                    <i className="fa-brands fa-linkedin-in"></i>
                  </button>
                </div>
              </div>
              <div className=" text-sm text-gray-400">{user?.username}</div>
              <div className=" w-full sm:w-96 text-sm text-gray-600">
               {user?.bio}
              </div>
              <div className=" flex gap-4 my-2 font-semibold">
                <div>
                  <span className=" ">{user?.followers?.length}</span> followers
                </div>
                <div>
                  <span className="">{user?.following?.length}</span> following
                </div>
              </div>
              {
                loggedInUser._id === user._id ? (
                  
              <div className=" flex justify-between items-center">
                <div className=" flex gap-4 my-2">
                  <Link to="/edit-profile" className=" bg-black border border-black py-1 text-white px-3 rounded-md text-sm flex gap-2 items-center ">
                    <div>Edit profile</div>
                  </Link>
                  <button className="  bg-white py-1 text-black px-3 border border-black rounded-md text-sm ">
                    Share Profile
                  </button>
                </div>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      {" "}
                      <button className=" p-2">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className=" mr-4 w-48">
                      <Link to={"/saved-post"}>
                        <DropdownMenuItem className=' cursor-pointer !p-3'>
                          Saved post
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className={" cursor-pointer text-red-600 font-semibold !p-3"}
                      >
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
                ) :(
                  <div className=" flex justify-between items-center">
                  <div className=" flex gap-4 my-2">
                    <button onClick={handleFollowUnfollow} className={`${isFollowed ? ' bg-red-500' :'bg-blue-500'} py-1 text-white px-3 rounded-md text-sm flex gap-2 items-center `}>
                      {!isFollowed && <i className=" fa-solid fa-user-plus"></i>}
                      {loading ? <MiniLoader/> : (isFollowed ? 'Unfollow' : 'Follow')}
                    </button>
                    {
                      isFollowed && <button className="  bg-white py-1 text-black px-3 border border-black rounded-md text-sm ">
                      Message
                    </button>
                    }
                  </div>
                </div>
                )
              }
            </div>
          </div>
          {
            isFollowed || (loggedInUser._id === user._id)? (
              <div className=" w-full">
            <ProfileTabs posts={user?.posts} />
          </div>
            ):(
            <ProtectUserContent className=" h-36 text-red-500 flex justify-center items-center w-full font-semibold">
              Please follow this account first to see the posts
            </ProtectUserContent>
            )
          }
        </div>
        <div className=" w-96 lg:block hidden h-fit">
          <RightSuggestaion />
        </div>
      </div>
    </Container>
  );
}

export default Profile;
