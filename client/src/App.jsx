import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Homepage from './pages/Homepage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        {/* <Route path="/:username/post/:pid" element={<Postpage />} /> */}
        {/* <Route path="/:username" element={<Userpage />} /> */}
        {/* <Route path="/profile" element={<Profilepage />} /> */}
        {/* <Route path="signup" element={<Signup_page/>}/> */}
        {/* <Route path="signin" element={<Signin_page/>}/> */}
      </Route>
    </Routes>
  )
}

export default App