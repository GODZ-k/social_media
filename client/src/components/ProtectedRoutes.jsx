

import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

function ProtectedRoutes({children}) {
    const navigate = useNavigate()
    const user = useSelector(state=> state.auth.status)
  
   return user ? navigate("/") : children
}

export default ProtectedRoutes