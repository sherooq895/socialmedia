import React from 'react'
import './Userprofile.css'
import { Link, Navigate, useNavigate } from "react-router-dom";


function Userprofile() {

   

    const username=localStorage.getItem('username')
    const profilepicture=localStorage.getItem('profilepicture')

    console.log(username);
    console.log('username');
    console.log(profilepicture);


    return (
        <div >

            <div className='w-100% bg-neutral-700 h-72'>

                <div>
                    <div className='flex justify-center mr-80'>
                        <div className='text-yellow-300 text-4xl'>john__</div>
                    </div>
                    <div>
                        <div className='flex justify-end mr-80'>

                            <div className='mr-24 mt-20'>
                                <div className='text-4xl text-white'>
                                  {username}
                                </div>
                                <div className='text-xl text-white'>
                                    sdjnkmdsdnajnkmnmsadfssdfds
                                </div>

                            </div>
                            <div className='image-item '>
                                <img src={`../images/${profilepicture}`} alt="profile picture" />
                            </div>

                        </div>
                    </div>
                    <div className='flex justify-center mr-40'>
                        <div className='mr-5 flex '>
                            <div>
                                <div className='text-white text-2xl'>1000</div>
                            </div>
                            <div>
                                <div className='text-yellow-500 mt-2'>Followers</div>
                            </div>
                        </div>
                        <div  className='flex'>
                            <div>
                                <div className='text-white text-2xl'>1000</div>
                            </div>
                            <div>
                                <div className='text-yellow-500 mt-2'>Following</div>
                            </div>
                        </div>
                        <div className='ml-20 mt-1'>
                        <Link to='/editprofile'><button   className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-4 rounded'>Edit Profile</button></Link>
                        </div>
                        <div className='ml-2 mt-1'>
                            <Link to='/addpost'><button   className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-4 rounded'>Add Post</button></Link>
                        </div>
                    </div>

                </div>

               
            </div>
        </div>

    )
}

export default Userprofile