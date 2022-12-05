import React, { useEffect, useState } from 'react'
import { BiBell, BiConversation, BiCircle } from "react-icons/bi";
import jwt_decode from 'jwt-decode'
import {Link, Navigate, useNavigate } from 'react-router-dom'
import './Navbar.css'
import axios from 'axios'
// import { usercontext } from '../context/context'

function Navbar() {

    let Navigate = useNavigate()

    // const [userdataa, setuserdata] = useState(usercontext)

    const [popup, setPopup] = useState(false)
    const [data, setdata] = useState()

    const userdata = localStorage.getItem('token')
    let decodedata = jwt_decode(userdata)
    localStorage.setItem('userid', decodedata.id)
    localStorage.setItem('username', decodedata.fname)
    localStorage.setItem('profilepicture', decodedata.profilepicture)
    const logid=localStorage.getItem('userid')
    const token=localStorage.getItem('token')
   


    useEffect(
       
        ()=>{
            axios.post('http://localhost:4000/app/loguser',{logid}, {
                headers: { token: `Bearer ${token}` },
            }).then((response)=>{
                console.log(response);
                console.log('responsebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
                setdata(response.data)

            })

        },[]
    ) 



    const logout = () => {
        localStorage.removeItem('token')
        Navigate('/')
    }

    console.log(data)
    console.log("data")
   


    return (
        <div>
            <nav className=" bg-[#153f7c] ">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">

                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div onClick={() => Navigate('/home')}>

                                <p className='text-4xl  text-white'>PostX</p>
                            </div>


                        </div>
                        <div className="  absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <div className='pr-3 text-2xl'>
                                <button> <h3 className='text-[#fafafa]'>  <BiBell /> </h3></button>

                            </div>
                            <div className='pr-3 text-2xl'>
                                <button>
                               <Link to='/userchat'> <p className='text-[#ffffff]'><BiConversation /></p></Link>
                                </button>
                            </div>
                            <div className='pr-3 flex'>
                                <div>
                                    <div className='propic'>
                                        <img src={`./images/${data?.profilepicture}`} alt="" />
                                        
                                    </div>
                                </div>
                                <div onClick={() => { setPopup(!popup) }}>
                                    <p className='text-white mt-5'>{data?.fname}</p>
                                </div>

                            </div>



                        </div>
                    </div>
                </div>

                {/* <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        <a href="#" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Dashboard</a>

                        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Team</a>

                        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>

                        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Calendar</a>
                    </div>
                </div> */}
            </nav>


            {popup ?
                <div className='p-8  bg-neutral-300 w-[10%] absolute right-[4rem] top-[4rem] z-50'>
                    <ul>
                        <li>
                            <div onClick={() => Navigate('/profile')}>
                                <button >Profile</button>
                            </div>
                        </li>
                        <br />

                        <li><button>Setting</button></li>
                        <br />

                        <li><button onClick={logout}>LogOut</button></li>

                    </ul>
                </div> : null
            }
        </div>

    )
}

export default Navbar