import React from 'react'
import Rightchat from '../../components/Chatright/Chatright'
import Leftchat from '../../components/Chatleft/Chatleft'
import Navbar from '../../components/Navbar/Navbar'

function userchat() {
    return (
        <>
            <Navbar />
            <div className='flex justify-center'>
                <div className='w-[50%]'>

                    <Rightchat />
                </div>
                <div className='w-[50%]'>

                    <Leftchat />
                </div>

            </div>

        </>
    )
}

export default userchat