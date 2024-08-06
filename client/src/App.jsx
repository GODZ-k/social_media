import React, { useEffect } from "react";
import { Container, Button } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Userpage from "./pages/Userpage";
import Postpage from "./pages/Postpage";
import Layout from "./Layout";
import Homepage from "./pages/Homepage";
import Signup_page from "./pages/Signup_page";
import Signin_page from "./pages/Signin_page";
import { getProfile } from "./Api/ApiData";
function App() {

  useEffect(()=>{
     getProfile()
  },[])

  return (
    <Container maxW="620px">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/:username/post/:pid" element={<Postpage />} />
          <Route path="/:username" element={<Userpage />} />
          <Route path="signup" element={<Signup_page/>}/>
          <Route path="signin" element={<Signin_page/>}/>
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
