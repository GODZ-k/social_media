import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
const Layout = lazy(() => import("./Layout"));
const Homepage = lazy(() => import("./pages/Homepage"));
const Signup_page = lazy(() => import("./pages/Signup_page"));
const Signin_page = lazy(() => import("./pages/Signin_page"));
import { ProtectedRoutes, PublicRoutes, TopLoadingBar } from "./components";
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const Explorepage = lazy(() => import("./pages/Explorepage"));
const SavedPostpage = lazy(() => import("./pages/SavedPostpage"));
const EditProfile_page = lazy(() => import("./pages/EditProfile_page"));
const Chat_page = lazy(() => import("./pages/Chat_page"));
const Chatting_page = lazy(() => import("./pages/Chatting_page"));
import { getProfile, getAllPosts, getAllUsers } from "../Api/ApiData";
import { useDispatch } from "react-redux";
import { setUsers } from "./redux/features/authSlice";
import useSocket from "./hooks/useSocket";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getProfile(dispatch);
    (async()=>{
      const data = await getAllUsers('');
      dispatch(setUsers(data))
    })()
  }, [navigate,dispatch]);

  useEffect(() => {
    getAllPosts(dispatch);

    const interval = setInterval(() => {
      getAllPosts(dispatch);
    }, 30000);

    return () => clearInterval(interval);
  }, [navigate,dispatch]);

  useSocket()
  

  return (
    <Suspense fallback={<TopLoadingBar />}>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<TopLoadingBar />}>
              <Layout />
            </Suspense>
          }
        >
          {/* protected routes */}
          <Route
            index
            element={
              <Suspense fallback={<TopLoadingBar />}>
                {/* <ProtectedRoutes> */}
                <Homepage />
                {/* </ProtectedRoutes> */}
              </Suspense>
            }
          />
          <Route
            path="/profile/:username"
            element={
              <Suspense fallback={<TopLoadingBar />}>
                <ProtectedRoutes>
                  <ProfilePage />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path="/search"
            element={
              <Suspense fallback={<TopLoadingBar />}>
                <ProtectedRoutes>
                  <SearchPage />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path="/explore"
            element={
              <Suspense fallback={<TopLoadingBar />}>
                <ProtectedRoutes>
                  <Explorepage />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path="/saved-post"
            element={
              <Suspense fallback={<TopLoadingBar />}>
                <ProtectedRoutes>
                  <SavedPostpage />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <Suspense fallback={<TopLoadingBar />}>
                <ProtectedRoutes>
                  <EditProfile_page />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path="/direct/inbox/"
            element={
              <Suspense fallback={<TopLoadingBar />}>
                <ProtectedRoutes>
                  <Chat_page />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path="/direct/t/:identifier"
            element={
              <Suspense fallback={<TopLoadingBar />}>
                <ProtectedRoutes>
                  <Chatting_page />
                </ProtectedRoutes>
              </Suspense>
            }
          />
        </Route>

        {/* public roiutes */}
        <Route
          path="/signup"
          element={
            <Suspense fallback={<TopLoadingBar />}>
              <PublicRoutes>
                <Signup_page />
              </PublicRoutes>
            </Suspense>
          }
        />
        <Route
          path="/signin"
          element={
            <Suspense fallback={<TopLoadingBar />}>
              <PublicRoutes>
                <Signin_page />
              </PublicRoutes>
            </Suspense>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
