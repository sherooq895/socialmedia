import React, { useEffect } from 'react'
import './Userprofile.css'
import { Link, Navigate, useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { useState } from 'react';


function Userprofile() {
    const token = localStorage.getItem('token')

    const Navigate=useNavigate()
    const [popup, setpopup] = useState(false)
    const [followingpopup, setfollowingpopup] = useState(false)

    const userdata = localStorage.getItem('token')
    const decodedata = jwt_decode(userdata)
    const [dataa, setdata] = useState()
    const [followers, setfollowers] = useState([])
    const [following, setfollowing] = useState([])
    const [commentresp,setcommentresp]=useState('')
    const data = decodedata.id

    console.log(token);
    console.log('token');

    useEffect(
        () => {
            axios.post('http://localhost:4000/app/getuserdata', { data }).then((response) => {

                setdata(response.data)
                setcommentresp(Math.random())
               

            })

        }, []
    )


    const getfollowers = async (data) => {
        console.log('dataxxxxxxxxxxxxxxxxxxxxx');
        console.log(data);
        console.log('dataxxxxxxxxxxxxxxxxxxxxx');
        axios.post('http://localhost:4000/app/getfollowers', { data }, {
            headers: { token: `Bearer ${token}` },
        }).then((response) => {

            setfollowers(response.data)
            setpopup(!popup)
        })


    }



    const getfollowing = async (data) => {
        axios.post('http://localhost:4000/app/getfollowing', { data}, {
            headers: { token: `Bearer ${token}` },
        } ).then((response) => {
            setfollowing(response.data)
            setfollowingpopup(!followingpopup)
        })
    }

    

    


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
                                <img src={`../images/${dataa?.profilepicture}`} alt="profile picture" />
                            </div>

                            <div className='mr-24 mt-20'>
                                <div className='text-4xl text-[#153f7c]'>
                                    {dataa?.fname}
                                </div>
                                <div className='text-xl text-[#888b8f]'>
                                    {dataa?.discription}
                                </div>

                            </div>

                            <div className='mr-5 mt-5'>
                                <div>
                                    <div onClick={() => getfollowers(dataa.follower)} className='text-[#6e6f72] text-2xl'>{dataa?.follower?.length}</div>
                                </div>
                                <div className='mb-3'>
                                    <div className='text-[#153f7c] mt-2'>Followers</div>
                                </div>
                                <div>
                                    <div onClick={() => getfollowing(dataa.following)}  className='text-[#6e6f72] text-2xl'>{dataa?.following?.length}</div>
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
                {
                    popup ?
                        <>
                            <div className='w-full h-fulll bg-[#666666d5] left-0 right-0 z-10 top-0 bottom-0 fixed'></div>
                            <div className='w-[30%] h-4/5 bg-slate-100 fixed left-[35%] z-20 top-[10%] p-5 rounded-xl'>
                                <div className=''>
                                    <div className='flex justify-center'>
                                        <div onClick={()=>setpopup(!popup)} className='text-black text-2xl mb-8'>Followers</div>
                                    </div>
                                    <div>
                                        <div>
                                            {
                                                followers.map((data)=>{
                                                    return(
                                                        <div className='flex mb-5 justify-items-start'>
                                                        <div className='rightbar'>
                                                            <img src={`./images/${data.profilepicture}`} alt="kkkkkkkkkkk" />
                                                        </div>
                                                        <div>
                                                            <div className='mt-2 ml-2 text-lg text-[#12233d]'>{data.fname}</div>
                                                        </div>
                                                    </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </>
                        : null

                }
                 {
                    followingpopup ?
                        <>
                            <div className='w-full h-fulll bg-[#666666d5] left-0 right-0 z-10 top-0 bottom-0 fixed'></div>
                            <div className='w-[30%] h-4/5 bg-slate-100 fixed left-[35%] z-20 top-[10%] p-5 rounded-xl'>
                                <div className=''>
                                    <div className='flex justify-center'>
                                        <div onClick={()=>setfollowingpopup(!followingpopup)} className='text-black text-2xl mb-8'>Following</div>
                                    </div>
                                    <div>
                                        <div>
                                            {
                                                following.map((data)=>{
                                                    return(
                                                        <div className='flex mb-5 justify-items-start'>
                                                        <div className='rightbar'>
                                                            <img src={`./images/${data.profilepicture}`} alt="kkkkkkkkkkk" />
                                                        </div>
                                                        <div>
                                                            <div className='mt-2 ml-2 text-lg text-[#12233d]'>{data.fname}</div>
                                                        </div>
                                                    </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </>
                        : null

                }




            </div>
        </div>

    )
}

export default Userprofile