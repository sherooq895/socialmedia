import React, { useEffect, useState } from 'react'
import './Profile.css'
import jwt_decode from 'jwt-decode'
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios'


function Profile() {
    const Navigate = useNavigate()
    const Location = useLocation()
    const [dataa, setdataa] = useState()
    const [logdata, setlogdata] = useState()
    const userdata = localStorage.getItem('token')
    let userdatadecode = jwt_decode(userdata)
    let userdataaa = userdatadecode.id

    console.log(userdatadecode.id);
    console.log('userdatadecode');


    const token = localStorage.getItem('token')


    useEffect(
        () => {

            if (Location.state) {
                const userdata = Location.state?.datas
                const dataa = userdata?._id


                axios.post('http://localhost:4000/app/getuserdataa', { dataa },{
                    headers: { token: `Bearer ${token}` },
                }).then((response) => {

                    setdataa(response.data)

                })

                axios.post('http://localhost:4000/app/getloguser', { userdataaa },{
                    headers: { token: `Bearer ${token}` },
                }).then((response) => {

                    setlogdata(response.data)

                })

            } else {
                Navigate('/home')

            }




        }, []

    )
  



    const followrequest = (data) => {

        axios.post('http://localhost:4000/app/followrequest', { data }, {
            headers: { token: `Bearer ${token}` },
        }).then((response) => {
            alert('followed succesfully')
        })

    }



    const unfollowrequest = (data) => {
        axios.post('http://localhost:4000/app/unfollowrequest', { data }, {
            headers: { token: `Bearer ${token}` }
        }).then((response) => {
            console.log('response');
            alert('unfollow successfully')

        })

    }


    const followback = (data) => {
        axios.post('http://localhost:4000/app/followback', { data }, {
            headers: { token: `Bearer ${token}` }
        }).then((response) => {

            console.log(response);
            alert('followback successfully')

        })

    }

    const usermessage=(logId,userId)=>{
        console.log(logId);
        console.log(userId);
        console.log('sasasaasssasxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        axios.post('http://localhost:4000/conversation', { senderId:logId,recieverId:userId }, {
            headers: { token: `Bearer ${token}` }
        }).then((response) => {
            console.log(response);
            console.log('response');
            Navigate('/userchat')

          
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
                                <img src={`./images/${dataa?.profilepicture}`} alt="profile picture" />
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
                                    <div className='text-[#6e6f72] text-2xl'>{dataa?.follower?.length}</div>
                                </div>
                                <div className='mb-3'>
                                    <div className='text-[#153f7c] mt-2'>Followers</div>
                                </div>
                                <div>
                                    <div className='text-[#6e6f72] text-2xl'>{dataa?.following?.length}</div>
                                </div>
                                <div>
                                    <div className='text-[#153f7c] mt-2 '>Following</div>
                                </div>
                            </div>

                            <div className='flex mt-28 ml-3 '>

                                <div className=' mt-1'>
                                    {
                                        logdata?.follower?.includes(dataa._id) && logdata?.following?.includes(dataa._id) ?
                                            <Link to=''><button onClick={() => unfollowrequest({ userid: logdata._id, userdataid: dataa._id })} className='bg-[#153f7c] hover:bg-[#081f41] text-white font-bold py-1 px-4 rounded'>unfollow</button></Link> :

                                            logdata?.following?.includes(dataa._id) ?
                                                <Link to=''><button onClick={() => unfollowrequest({ userid: logdata._id, userdataid: dataa._id })} className='bg-[#153f7c] hover:bg-[#081f41] text-white font-bold py-1 px-4 rounded'>Following</button></Link> :
                                                logdata?.follower?.includes(dataa._id) ?
                                                    <Link to=''><button onClick={() => followback({ userid: logdata._id, userdataid: dataa._id })} className='bg-[#153f7c] hover:bg-[#081f41] text-white font-bold py-1 px-4 rounded'>followback</button></Link> :
                                                    <Link to=''><button onClick={() => followrequest({ userid: logdata._id, userdataid: dataa._id })} className='bg-[#153f7c] hover:bg-[#081f41] text-white font-bold py-1 px-4 rounded'>Follow</button></Link>
                                    }

                                </div>
                                <div>
                                <button onClick={()=>usermessage(logdata?._id,dataa?._id )}  className='bg-[#153f7c] hover:bg-[#081f41] text-white font-bold py-1 px-4 rounded mt-1 ml-3'>message</button>


                                </div>


                            </div>

                        </div>


                    </div>
                </div>



            </div>
        </div>

    )
}

export default Profile