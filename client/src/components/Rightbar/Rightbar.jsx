import React, { useEffect, useState } from 'react'
import './Rightbar.css'
import axios from 'axios'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

function Rightbar() {
    const token = localStorage.getItem('token')

    const Navigate = useNavigate()
    const user = localStorage.getItem('token')
    const userdata = jwt_decode(user)
    console.log(userdata.id);
    console.log('userdata');
    const logid = userdata.id

    const [userprofile, setuserprofile] = useState([])
    const [userposts, setuserposts] = useState([])
    const [userlog, setuserlog] = useState()
    const [userr, setuser] = useState('')

    useEffect(
        () => {

            axios.get('http://localhost:4000/app/getusers', {
                headers: { token: `Bearer ${token}` },
            }).then((response) => {

                setuserprofile(response.data)
            })

            axios.post('http://localhost:4000/app/loguser', { logid },{
                headers: { token: `Bearer ${token}` },
            }).then((response) => {
                console.log(response);
                console.log('responseloggggggg');
                setuserlog(response.data)
               
            })

        }, [userr]
    )


    const getuserprofile = (data) => {

        Navigate('/userprofile', {
            state: {
                datas:data,
                // userposts: resp.data
            }
        })
    }

    const followrequest = (data) => {

        axios.post('http://localhost:4000/app/followrequest', { data }, {
            headers: { token: `Bearer ${token}` },
        }).then((response) => {
            alert('followed succesfully')
            setuser(Math.random())
        })

    }

    const unfollowrequest = (data) => {
        axios.post('http://localhost:4000/app/unfollowrequest', { data }, {
            headers: { token: `Bearer ${token}` }
        }).then((response) => {
            alert('unfollow successfully')
            setuser(Math.random())

        })

    }

    const followback = (data) => {
        axios.post('http://localhost:4000/app/followback', { data }, {
            headers: { token: `Bearer ${token}` }
        }).then((response) => {

            console.log(response);
            alert('followback successfully')
            setuser(Math.random())

        })

    }






    return (
        <div className='p-4 m-3 bg- bg-white rounded-lg'>
            <div className='text-[#153f7c] text-xl mb-5'>Suggetions For You</div>


            <div className='scoller-right-bar  '>
                {

                    userprofile.map((dataa) => {
                        return (
                            dataa?._id!==logid?

                            <div className='flex mb-3'>
                                <div className='rightbar' onClick={() => getuserprofile(dataa?._id)}>
                                    <img src={`./images/${dataa?.profilepicture}`} alt="" />
                                </div>
                                <div>
                                    <div className='mt-2 ml-2 text-lg text-[#12233d]'>{dataa?.fname}</div>
                                    {userlog?.follower?.includes(dataa?._id) && userlog?.following?.includes(dataa?._id) ?
                                        <Link to=''><button onClick={() => unfollowrequest({ userid: userlog?._id, userdataid: dataa?._id })} className='bg-[#153f7c] hover:bg-[#081f41] text-white font-bold py-1 px-4 rounded'>unfollow</button></Link> :
                                        userlog?.following?.includes(dataa?._id) ?
                                            <Link to=''><button onClick={() => unfollowrequest({ userid: userlog?._id, userdataid: dataa?._id })} className='bg-[#153f7c] hover:bg-[#081f41] text-white font-bold py-1 px-4 rounded'>Following</button></Link> :
                                            userlog?.follower?.includes(dataa._id) ?
                                                <Link to=''><button onClick={() => followback({ userid: userlog?._id, userdataid: dataa?._id })} className='bg-[#153f7c] hover:bg-[#081f41] text-white font-bold py-1 px-4 rounded'>followback</button></Link> :
                                                <Link to=''><button onClick={() => followrequest({ userid: userlog?._id, userdataid: dataa?._id })} className='bg-[#153f7c] hover:bg-[#081f41] text-white font-bold py-1 px-4 rounded'>Follow</button></Link>

                                    }





                                </div>

                            </div>:''

                        )
                    })


                }


            </div>
        </div>
    )
}

export default Rightbar