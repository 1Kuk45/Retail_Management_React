import React from 'react'
import Navbar from '@/modules/common/Navbar'
import {Link, Navigate, Outlet, useLocation} from 'react-router-dom'
import Sidebar  from '../modules/common/Sidebar'
import useAuth from '@/hooks/useAuth'

const DefaultLayouts = () => {
  const { isAuthenticated } = useAuth()
	const location = useLocation()
  if(isAuthenticated){
    console.log("Ok");
  }else{
    console.log("No")
  }
  return (
  !isAuthenticated ? (
    <Navigate to="/auth/login" state={{ from: location }}  replace />
  ):
    <div className="flex flex-col min-h-screen">
         <Navbar/>
        <Sidebar children={undefined}/> 
        {/* <Outlet /> */}
    </div>
  )
}

export default DefaultLayouts