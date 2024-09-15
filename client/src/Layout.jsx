import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import {Header} from "./components"
import { useSelector } from 'react-redux'
function Layout() {
  const location = useLocation()
  const user = useSelector(state => state.auth.status)  
  
  return (
    <>
        <div className=' md:hidden'>
        <Header/>
        </div>
        {
          user ? (
            <Outlet/>
          ) : (
            // <Navigate to={"/signin"} state={{from: location }} replace/>
            <></>
          )
        } 
        {/* <Footer/> */}
    </>
  )
}

export default Layout