import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Profile from '../../components/Profile/Profile'
import Posts from '../../components/Userallpost/Userallpost'


function profile() {
    return (
        < >
        <div className='bg-[#ccc]'>
        < Navbar />
        <div className=''>

            < Profile />
        </div>
            < Posts />

        </div>
           
        </>

    )
}

export default profile