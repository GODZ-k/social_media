import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
const Layout = lazy(() => import("./Layout"));
const Homepage  = lazy(()=> import("./pages/Homepage"))
const Signup_page = lazy(()=> import("./pages/Signup_page"))
const Signin_page = lazy(()=> import("./pages/Signin_page"))
import { ProtectedRoutes, TopLoadingBar } from "./components";
const ProfilePage = lazy(()=> import("./pages/ProfilePage"))
const SearchPage = lazy(()=> import("./pages/SearchPage"))
const Explorepage = lazy(()=> import("./pages/Explorepage"))
import { getProfile } from "../Api/ApiData";
import { useDispatch } from "react-redux";

function App() {
  
  const dispatch = useDispatch()

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
          <Route
            index
            element={
              <Suspense fallback={<TopLoadingBar />}>
                <Homepage />
              </Suspense>
            }
          />
          <Route path="/profile" element={<Suspense fallback={<TopLoadingBar/>}>
            <ProfilePage />
          </Suspense>} />
          <Route path="/search" element={<Suspense fallback={<TopLoadingBar/>}>
            <SearchPage />
          </Suspense>} />
          <Route path="/explore" element={<Suspense fallback={<TopLoadingBar/>}><Explorepage /></Suspense>} />
        </Route>
        <Route
          path="/signup"
          element={
            <Suspense fallback={<TopLoadingBar />}>
            {/* <ProtectedRoutes> */}
            <Signup_page />
            {/* </ProtectedRoutes> */}
            </Suspense>
          }
        />
        <Route
          path="/signin"
          element={
            <Suspense fallback={<TopLoadingBar />}>
              {/* <ProtectedRoutes> */}
              <Signin_page />
              {/* </ProtectedRoutes> */}
            </Suspense>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
