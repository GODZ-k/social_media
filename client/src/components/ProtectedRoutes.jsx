

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

function ProtectedRoutes({children}) {
    const navigate = useNavigate()
    const user = useSelector(state=> state.auth.status)
  
    useEffect(() => {
        if (!user) {
          navigate('/');
        }
      }, [user, navigate]);

      
   return !user ? children : null
}

export default ProtectedRoutes