import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
const Layout = lazy(() => import("./Layout"));
const Homepage = lazy(() => import("./pages/Homepage"));
const Signup_page = lazy(() => import("./pages/Signup_page"));
const Signin_page = lazy(() => import("./pages/Signin_page"));
import { ProtectedRoutes, PublicRoutes, TopLoadingBar } from "./components";
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const Explorepage = lazy(() => import("./pages/Explorepage"));
import { getProfile } from "../Api/ApiData";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getProfile(dispatch);
  }, [dispatch]);

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
