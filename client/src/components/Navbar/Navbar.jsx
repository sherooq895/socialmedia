import React, { useEffect, useState, useRef } from 'react'
import { BiBell, BiConversation, BiCircle } from "react-icons/bi";
import jwt_decode from 'jwt-decode'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import './Navbar.css'
import axios from 'axios'
import { io } from "socket.io-client"
import { format } from 'timeago.js'

// import { usercontext } from '../context/context'

function Navbar() {
    const token = localStorage.getItem('token')
    const socket = useRef();


    let Navigate = useNavigate()
    const [datax, setdatax] = useState([])

    // useEffect(
    //     ()=>{
    //         socket.current = io("ws://localhost:8900");
    //         socket.current.on("getnotification", data => {

    //             console.log(data);
    //             console.log('datavvvvvvvvvvvvvvvvvvvvvv');
    //             setdatax((prev)=>[...prev,data])
    //         })
    //     },[socket]
    // )




    // const [userdataa, setuserdata] = useState(usercontext)

    const [popup, setPopup] = useState(false)
    const [searchpopup, setsearchPopup] = useState(false)
    const [notification, setnotification] = useState(false)
    const [data, setdata] = useState()
    const [searchvalue, setsearchvalue] = useState({
        search: ''
    })
    const [searchdata, setsearchdata] = useState([])
    const [notificationdata, setnotificationdata] = useState([])
    const [notificationicon, setnotificationicon] = useState([])
    const [notificationnumber, setnotificationnumber] = useState()
    const [refresh, setrefresh] = useState('')


    const searchsubmit = async (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setsearchvalue({
            ...searchvalue,
            [name]: value
        })
        const data = searchvalue.search
        axios.post('http://localhost:4000/app/searchuser', { data }, {
            headers: { token: `Bearer ${token}` },
        }).then((response) => {
            setsearchdata(response.data)
        })
    }

    console.log(searchdata);
    console.log('searchdata');

    const userdata = localStorage.getItem('token')
    let decodedata = jwt_decode(userdata)
    localStorage.setItem('userid', decodedata.id)
    localStorage.setItem('username', decodedata.fname)
    localStorage.setItem('profilepicture', decodedata.profilepicture)
    const logid = localStorage.getItem('userid')




    useEffect(

        () => {
            axios.post('http://localhost:4000/app/loguser', { logid }, {
                headers: { token: `Bearer ${token}` },
            }).then((response) => {
                setdata(response.data)
            })


            axios.post('http://localhost:4000/app/getnotification', { logid }, {
                headers: { token: `Bearer ${token}` },
            }).then((response) => {
                if (response.data.notget) {
                    console.log('dsd');
                } else {
                    setnotificationicon(response.data.Notification)
                }
            })

        }, [notificationdata, notificationnumber]
    )
    useEffect(
        () => {
            var count = 0;
            notificationicon?.map((data) => {
                if (data?.status == 'true') {
                    count += 1
                }
            })
            setnotificationnumber(count)
        }, [notificationicon]
    )



    const logout = () => {
        localStorage.removeItem('token')
        Navigate('/')
    }

    console.log(searchvalue)
    console.log("data")

    const getuser = (data) => {

        Navigate('/userprofile', {
            state: {
                datas: data,
                // userposts: resp.data
            }
        })


    }

    const statusfalse = (logid) => {
        axios.post('http://localhost:4000/app/statusfalse', { logid }, {
            headers: { token: `Bearer ${token}` },
        }).then((response) => {
            console.log(response);
            console.log('response');
        })

    }



    const getnotification = (data) => {
        axios.post('http://localhost:4000/app/getnotification', { logid }, {
            headers: { token: `Bearer ${token}` },
        }).then((response) => {
            if (response.data.notget) {
                console.log('dsd');
                setnotification(!notification)
            } else {
                console.log(response.data);
                console.log('responsexxxxxxxxx');
                setnotificationdata(response.data.Notification)
                setnotification(!notification)
                statusfalse(logid)
            }


        })

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
                            <div className='mr-3 '>
                                <form className='rounded-xl' onClick={() => setsearchPopup(!searchpopup)} autocomplete="off">
                                    <input
                                        placeholder="Search for..."
                                        name='search'
                                        value={searchvalue.search}
                                        onChange={searchsubmit}
                                    />
                                </form>
                            </div>
                            <div className='pr-3 text-2xl'>
                                {/* {notificationicon?.map((data)=>(
                                  count= data?.status=='true'
                                  
                                  ?
                                  ''                                  
                                  ))} */}
                              
                                <button onClick={() => getnotification(logid)}> <h3 className='text-[#fafafa] relative'>  <BiBell />  <div className='text-sm bg-red-600 w-3 text-white rounded-full absolute top-0 right-0'>{notificationnumber}</div> </h3></button>

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

                        <li><button onClick={logout}>LogOut</button></li>

                    </ul>
                </div> : null
            }


            {searchpopup ?
                <div className='p-8  bg-neutral-300 w-[20%] absolute right-[13rem] top-[3rem] z-50 rounded-md'>
                    <ul>

                        {
                            searchdata?.error ?
                                <div>{searchdata?.error}</div> :
                                <div>
                                    {
                                        searchdata?.map((data) => {
                                            return (
                                                <li>
                                                    <div className='flex mb-3' >
                                                        <div className='leftitem'  >
                                                            <img onClick={() => getuser(data?._id)} src={`./images/${data?.profilepicture}`} alt="profilepic" />
                                                        </div>
                                                        <div className='mt-5 ml-2 text-lg text-[#153f7c]'>{data?.fname}</div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </div>
                        }
                        <div >

                        </div>


                    </ul>
                </div> : null
            }
            {notification ?
                <div className='p-8  bg-neutral-300 w-[30%] absolute right-[9rem] top-[3rem] z-50 rounded-md'>
                    <ul>

                        {
                            searchdata?.error ?
                                <div>{searchdata?.error}</div> :
                                <div>
                                    {
                                        notificationdata.length == 0 ?
                                            <div>
                                                <div className='mt-4 ml-2 mr-2 text-lg text-[#153f7c]'>No new notifications</div>

                                            </div> :
                                            notificationdata?.map((data) => {
                                                return (
                                                    <li>
                                                        <div className='flex mb-3' >
                                                            <div className='leftitem'  >
                                                                <img src={`./images/${data?.actionuser?.profilepicture}`} alt="profilepic" />
                                                            </div>
                                                            <div className=''>
                                                                <div className='flex'>
                                                                    <div className='mt-4 ml-2 mr-2 text-lg text-[#153f7c]'>{data?.actionuser?.fname}</div>
                                                                    <div>
                                                                        {
                                                                            data.type == '1' ?
                                                                                <div className='mt-5 text-[#153f7c]'>Likes Your Post</div> :
                                                                                data.type == '2' ? <div className='mt-5 text-[#153f7c]'>
                                                                                    Comments Your Post
                                                                                </div> : ''
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className='text-xs ml-2'>{format(data.date)}</div>
                                                            </div>

                                                        </div>
                                                        <hr className='w-[80%] h-.4 bg-slate-400 ml-6 mt-4' />
                                                    </li>
                                                )
                                            })
                                    }
                                </div>
                        }
                        <div >

                        </div>


                    </ul>
                </div> : null
            }

        </div>

    )
}

export default Navbar