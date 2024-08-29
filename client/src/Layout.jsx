import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Header from "./components/Header"
import { useSelector } from 'react-redux'
import { Sidebar } from './components'
function Layout() {
  const location = useLocation()
  const user = useSelector(state => state.auth.status)  
  
  return (
    <>
        {/* <Sidebar/> */}
        {
          user ? (
            <Outlet/>
          ) : (
            <Navigate to={"/signin"} state={{from: location }} replace/>
          )
        } 
        {/* <Footer/> */}
    </>
  )
}

export default Layout