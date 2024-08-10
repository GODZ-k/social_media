import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Homepage from './pages/Homepage'
import Signup_page from './pages/Signup_page'
import Signin_page from './pages/Signin_page'

function  App() {
 
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        {/* <Route path="/:username/post/:pid" element={<Postpage />} /> */}
        {/* <Route path="/:username" element={<Userpage />} /> */}
        {/* <Route path="/profile" element={<Profilepage />} /> */}
      </Route>
        <Route path="signup" element={<Signup_page/>}/> 
        <Route path="signin" element={<Signin_page/>}/>
      
    </Routes>
  )
}

export default App