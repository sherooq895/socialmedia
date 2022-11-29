import React from 'react'
import Rightchat from '../../components/Chatright/Chatright'
import Leftchat from '../../components/Chatleft/Chatleft'
import Navbar from '../../components/Navbar/Navbar'

function userchat() {
    return (
        <>
            <Navbar />
            <div className='flex justify-center'>
                <div className='w-[30%] mt-10 mb-10 h-96 bg-red-500'>
                <Leftchat />
                    
                </div>
                <div className='w-[50%] mt-10 mb-10 h-fit bg-blue-500'>

                 
                    <Rightchat />
                </div>

            </div>

        </>
    )
}

export default userchat