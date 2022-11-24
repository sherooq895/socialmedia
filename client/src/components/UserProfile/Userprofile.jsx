import React from 'react'
import './Userprofile.css'
import { Link, Navigate, useNavigate } from "react-router-dom";


function Userprofile() {



    const username = localStorage.getItem('username')
    const profilepicture = localStorage.getItem('profilepicture')

    console.log(username);
    console.log('username');
    console.log(profilepicture);


    return (
        <div >

            <div className='w-100% bg-white h-55 p-4'>

                <div>
                    {/* <div className='flex justify-center mr-80'>
                        <div className='text-yellow-300 text-4xl'>john__</div>
                    </div> */}
                    <div>
                        <div className='flex justify-end mr-80'>

                            <div className='image-item mr-4'>
                                <img src={`../images/${profilepicture}`} alt="profile picture" />
                            </div>

                            <div className='mr-24 mt-20'>
                                <div className='text-4xl text-[#153f7c]'>
                                    {username}
                                </div>
                                <div className='text-xl text-[#888b8f]'>
                                  discription
                                </div>

                            </div>

                            <div className='mr-5 mt-5'>
                                <div>
                                    <div className='text-[#6e6f72] text-2xl'>1000</div>
                                </div>
                                <div className='mb-3'>
                                    <div className='text-[#153f7c] mt-2'>Followers</div>
                                </div>
                                <div>
                                    <div className='text-[#6e6f72] text-2xl'>1000</div>
                                </div>
                                <div>
                                    <div className='text-[#153f7c] mt-2 '>Following</div>
                                </div>
                            </div>

                            <div className='flex mt-28 ml-3 '>
                               
                                <div className=' mt-1'>
                                    <Link to='/editprofile'><button className='bg-[#153f7c] hover:bg-[#081f41] text-white font-bold py-1 px-4 rounded'>Edit Profile</button></Link>
                                </div>
                                <div className='ml-2 mt-1'>
                                    <Link to='/addpost'><button className='bg-[#153f7c] hover:bg-[#0a254e] text-white font-bold py-1 px-4 rounded'>Add Post</button></Link>
                                </div>
                            </div>

                        </div>


                    </div>
                </div>



            </div>
        </div>

    )
}

export default Userprofile