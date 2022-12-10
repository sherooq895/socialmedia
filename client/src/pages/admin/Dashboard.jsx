import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Adminnavbar from '../../components/Adminnavbar/Adminnavbar'
import Adminsidebar from '../../components/Adminsidebar/Adminsidebar'

function Dashboard() {

  return (
    <>
        <Adminnavbar/>
      <div className='flex'>
        <Adminsidebar />
        <div className=' bg-[#ccc] w-[100%]'>
            <Outlet/>
        </div>
      </div>
    </>
  )



}

export default Dashboard
