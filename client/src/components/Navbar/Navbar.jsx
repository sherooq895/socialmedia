import React, { useState } from 'react'
import { BiBell, BiConversation, BiCircle } from "react-icons/bi";
import jwt_decode from 'jwt-decode'
import { Navigate, useNavigate } from 'react-router-dom'
import './Navbar.css'
// import { usercontext } from '../context/context'

function Navbar() {

    let Navigate = useNavigate()

    // const [userdataa, setuserdata] = useState(usercontext)

    const [popup, setPopup] = useState(false)

    const userdata = localStorage.getItem('token')
    console.log(userdata);
    console.log('userdata');

    let decodedata = jwt_decode(userdata)
    console.log(decodedata);
    console.log('decodedata');
    localStorage.setItem('userid', decodedata.id)
    localStorage.setItem('username', decodedata.fname)
    localStorage.setItem('profilepicture', decodedata.profilepicture)



    const logout = () => {
        localStorage.removeItem('token')
        Navigate('/')
    }



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
                                <button> <h3 className='text-yellow-300'>  <BiBell /> </h3></button>

                            </div>
                            <div className='pr-3 text-2xl'>
                                <button>
                                    <p className='text-yellow-300'><BiConversation /></p>
                                </button>
                            </div>
                            <div className='pr-3 flex'>
                                <div>
                                    <div className='propic'>
                                        <img src={`./images/${decodedata.profilepicture}`} alt="" />
                                        
                                    </div>
                                </div>
                                <div onClick={() => { setPopup(!popup) }}>
                                    <p className='text-white mt-5'>{decodedata.fname}</p>
                                </div>

                            </div>



                        </div>
                    </div>
                </div>

                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        <a href="#" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Dashboard</a>

                        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Team</a>

                        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>

                        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Calendar</a>
                    </div>
                </div>
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