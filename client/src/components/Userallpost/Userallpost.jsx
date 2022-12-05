import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom'

function Userallpost() {

    const Location = useLocation()
    const [posts,setposts]=useState([])
    const Navigate=useNavigate()

    useEffect(
        () => {
            const posts = Location.state.userposts
            
            setposts(posts)

        }, []
    )
    console.log(posts);
    console.log('posts');

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
            <div className='w-[80%] bg-white rounded-xl'>
                {
                    posts.map((data) => {
                        return (
                            <div className='mt-6 flex justify-center' >
                                <div className='grid grid-cols-3 gap-4'>
                                    <img onClick={()=>getuserpic(data._id)} className='postpic hover:scale-110' src={`./images/${data.image}`} alt="jjjjjdfty" />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Userallpost