import React from "react";
import { Button } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Userpage from "./pages/Userpage";
import Postpage from "./pages/Postpage";
import Layout from "./Layout";
import Homepage from "./pages/Homepage";
function App() {
  return (
    <Container maxW="620px">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Homepage />} /> */}
          <Route path="/:username/post/:pid" element={<Postpage />} />
          <Route path="/:username" element={<Userpage />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
