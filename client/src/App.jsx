import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const Layout = lazy(() => import("./Layout"));
import Homepage from "./pages/Homepage";
import Signup_page from "./pages/Signup_page";
import Signin_page from "./pages/Signin_page";
import { TopLoadingBar } from "./components";

function App() {
  return (
    <Suspense fallback={<TopLoadingBar />}>
      <Routes>
        <Route path="/" element={<Suspense fallback={<TopLoadingBar/>}><Layout /></Suspense>}>
          <Route index element={<Suspense fallback={<TopLoadingBar/>}><Homepage /></Suspense>} />
          {/* <Route path="/:username/post/:pid" element={<Postpage />} /> */}
          {/* <Route path="/:username" element={<Userpage />} /> */}
          {/* <Route path="/profile" element={<Profilepage />} /> */}
        </Route>
        <Route path="/signup" element={<Suspense fallback={<TopLoadingBar/>}><Signup_page /></Suspense>} />
        <Route path="/signin" element={<Suspense fallback={<TopLoadingBar/>}><Signin_page /></Suspense>} />
      </Routes>
    </Suspense>
  );
}

export default App;
