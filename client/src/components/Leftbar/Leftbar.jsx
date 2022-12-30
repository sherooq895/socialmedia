import React, { useState, useEffect, useRef } from 'react'
import './Leftbar.css'
import { io } from "socket.io-client"
import axios from 'axios';
import { socket } from '../../context/socketcontext';


function Sidebar() {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('token')
  const userid = localStorage.getItem('userid')

  const [onlineUsers, setOnlineUsers] = useState([])
  const [userdata, setuserdata] = useState([])
  // const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current?.emit("addUser", userid);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users)
    })
  }, [])

  useEffect(() => {

    const onlineuser = onlineUsers.filter(person=>person.userId)
    axios.post('https://postx.gq/api/app/getonlineuser', onlineuser, {
      headers: { token: `Bearer ${token}` },
  } ).then((response) => {
      setuserdata(response.data)
    })
  }, [onlineUsers])




  return (
    <div className='w-[20%]  bg-white h-96 p-4 m-3 rounded-lg hidden md:block'>
      <div>
        <p className='text-[#153f7c] text-xl mb-2'> Online</p>
      </div>
      <div className='scoller-left-bar  '>
        {
          

          userdata?.map((data) => {
            return (
              data[0]?._id==userid?
              <div > 
            </div>:
              <div className='flex mb-3'>
                <div className='leftitem'>
                  <img src={`./images/${data[0]?.profilepicture}`} alt="profilepic" />
                  <div className="chatOnlineBadge"></div>
                </div>
                <div className='mt-5 ml-2 text-lg text-[#153f7c]'>{data[0]?.fname}</div>
              </div>

            )

          })

        }
       
      </div>

    </div>
  )
}

export default Sidebar