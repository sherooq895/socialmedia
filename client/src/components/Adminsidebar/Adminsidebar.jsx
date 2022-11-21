import React from 'react'
import './Adminsidebar.css'

function Adminsidebar() {
  return (
   <>
   <div className='w-[20%] bg-neutral-800 h-screen pl-10 pt-11'>

    <div className='text-white mb-8 text-2xl hover:bg-yellow-500'>Dashboard</div>
    <div className='text-white mb-8 text-2xl  hover:bg-yellow-500'>Users</div>
    <div className='text-white mb-8 text-2xl  hover:bg-yellow-500'>Posts</div>
   
   
   </div>
   </>
  )
}

export default Adminsidebar