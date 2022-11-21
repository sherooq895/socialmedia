import React from 'react'
import Userprofile from '../../components/UserProfile/Userprofile'
import Navbar from '../../components/Navbar/Navbar'
import Allpost from '../../components/Allpost/Allpost'

function userprofile() {
    return (
        <>
        <div className='bg-neutral-800'>
             <div><Navbar /></div>
            <Userprofile />
            <Allpost/>

        </div>
           
        </>

    )
}

export default userprofile
