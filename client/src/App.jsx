import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
const Layout = lazy(() => import("./Layout"));
import Homepage from "./pages/Homepage";
import Signup_page from "./pages/Signup_page";
import Signin_page from "./pages/Signin_page";
import { ProtectedRoutes, TopLoadingBar } from "./components";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import Explorepage from "./pages/Explorepage";
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
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/explore" element={<Explorepage />} />
        </Route>
        <Route
          path="/signup"
          element={
            <Suspense fallback={<TopLoadingBar />}>
            <ProtectedRoutes>
            <Signup_page />
            </ProtectedRoutes>
            </Suspense>
          }
        />
        <Route
          path="/signin"
          element={
            <Suspense fallback={<TopLoadingBar />}>
              <ProtectedRoutes>
              <Signin_page />
              </ProtectedRoutes>
            </Suspense>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
