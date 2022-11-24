import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Userpost from '../../components/Post/Post'
import Userprofile from '../../components/UserProfile/Userprofile'


function post() {
  return (
    <>
    <div className=' bg-[#ccc]'>
    <Navbar/>
    <Userprofile/>
    <Userpost/>

    </div>
   
    </>
  )
}

export default post