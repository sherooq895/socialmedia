import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Userpost from '../../components/Post/Post'
import Userprofile from '../../components/UserProfile/Userprofile'


function post() {
  return (
    <>
    <div className=' bg-neutral-800'>
    <Navbar/>
    <Userprofile/>
    <Userpost/>

    </div>
   
    </>
  )
}

export default post