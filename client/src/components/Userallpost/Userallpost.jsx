import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

function Userallpost() {
    const token = localStorage.getItem('token')

    const Location = useLocation()
    const [posts,setposts]=useState([])
    const Navigate=useNavigate()

    useEffect(
        () => {
            const id = Location.state?.datas
            console.log(id);
            console.log('id');

            axios.post('https://postx.gq/api/app/getuserprofileposts',{id}, {
                headers: { token: `Bearer ${token}` },
            }).then((response) => {
                console.log(response);
                console.log('response');

                // setuserprofile(response.data)
                setposts(response.data)
            })
            

        }, []
    )
    // console.log(posts);
    // console.log('posts');

    const getuserpic=(data)=>{
        console.log(data);
        Navigate('/userpost',{
            state:{
                postId:data

            }
        })

    }

    return (
        <div className='flex justify-center mt-4 '>
       
            <div className='w-[80%] bg-white rounded-xl grid grid-cols-3 mx-auto p-4 gap-2 '>
                {
                    posts.length==0?
                    <div className='text-xl'>No posts Available</div>:
                    posts?.map((data) => 
                        (
                            data?.block== false?
                            <div className='' >
                                <div className='h-[300px] '>
                                    <img onClick={()=>getuserpic(data?._id)} className='postpic relative hover:scale-110 w-full' src={`./images/${data.image}`} alt="jjjjjdfty" />
                                </div>
                            </div>:''
                        )
                    )
                }               
            </div>
        </div>
    )
}

export default Userallpost