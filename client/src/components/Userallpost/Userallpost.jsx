import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom'

function Userallpost() {

    const Location = useLocation()
    const [posts,setposts]=useState([])

    useEffect(
        () => {
            const posts = Location.state.userposts
            console.log(posts);
            console.log('posts');
            setposts(posts)

        }, []
    )





    return (
        <div className='flex justify-center mt-4 '>
            <div className='w-[80%] bg-white rounded-xl'>

                {
                    posts.map((data) => {
                        return (
                            <div className='mt-6 flex justify-center' >
                                <div className='grid grid-cols-3 gap-4'>


                                    <div ><img className='postpic hover:scale-110' src={`./images/${data.image}`} alt="jjjjjdfty" /></div>





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