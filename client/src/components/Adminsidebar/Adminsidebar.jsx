import React from 'react'
import './Adminsidebar.css'
import {Link, Navigate, useNavigate } from "react-router-dom";

function Adminsidebar() {
  let Navigate = useNavigate()

  const data = [{
    title: ' Post Report',
    to:'/admin/reportpost'
  }, {
    title: 'User Report',
    to:'/admin/reportuser'
  }]
  return (
    <>
      <div className='w-[20%] bg-[#153f7c] h-screen pl-10 pt-16'>
        <div className=' flex-col'>

        </div>

        {
          data.map((dataa) => {
            return (
             <Link to={dataa?.to}> <div className='text-white mb-8 text-xl hover:bg-yellow-500'>{dataa?.title}</div></Link>
            )

          })
        }




      </div>
    </>
  )
}

export default Adminsidebar