import React, { useContext, useEffect, useState, useRef } from 'react'
import Conversation from '../Conversations/Conversation'
import Message from '../Message/Message'
import "./Messenger.css"
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { io } from "socket.io-client"

function Messenger() {
    const userr = localStorage.getItem('token')
    const userdata = jwt_decode(userr)

    const logid = userdata.id

    const [user, setuser] = useState({})
    const [conversations, setconversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setmessages] = useState([])
    const [newMessage, setnewMessage] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const scrollRef = useRef();
    const socket = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
       
            socket.current.on("getMessage",data=>{
                setArrivalMessage({
                    sender:data.senderId,
                    text:data.text,
                    createdAt:Date.now()
                })
            })
    }, []);

    useEffect(()=>{
        arrivalMessage&&
        currentChat?.members.includes(arrivalMessage.sender)&&
        setmessages((prev)=>[...prev,arrivalMessage])
    },[arrivalMessage,currentChat])

    useEffect(() => {
        axios.post('http://localhost:4000/app/loguser', { logid }).then((response) => {
            setuser(response.data)
        })

        const getConversations = async () => {
            try {
                const res = await axios.get("http://localhost:4000/conversation/" + user._id)
                setconversations(res.data)
            } catch (err) {
                console.log(err);
            }
        }
        getConversations()
    }, [user._id])


    useEffect(() => {
       
        socket.current?.emit("addUser", user._id);
        socket.current?.on("getUsers", (users) => {
            setOnlineUsers(users)
        
        })
    }, [user, socket])

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("http://localhost:4000/message/" + currentChat?._id)
                setmessages(res.data)

            } catch (err) {
                console.log(err);
            }
        }

        getMessages()

    }, [currentChat])

  

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" })

    }, [messages])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        }

        const receiverId=currentChat.members.find(member=>member !==user._id)

        socket.current.emit("sendMessage",{
            senderId:user._id,
            receiverId,
            text:newMessage,


        })
        try {
            const res = await axios.post('http://localhost:4000/message', message);
            setmessages([...messages, res.data])
            setnewMessage("")
        } catch (err) {
            console.log(err);
        }

    }



    return (
        <div className='messenger flex justify-between bg-[#ccc]'>
            <div className='chatMenu bg-white h-96 m-4 rounded-xl'>
                <div className="chatMenuWrapper">
                   <p className=' ml-16 text-3xl '>Chats</p>
                   <hr className='w-[100%] h-.4 bg-slate-400 mt-4' />
                    {
                        conversations.map((c) => {
                            return (
                                <div onClick={() => setCurrentChat(c)}>

                                    <Conversation conversation={c} currentUser={user} />
                                    <hr className='w-[80%] h-.4 bg-slate-400 ml-6 mt-4' />
                                </div>

                            )
                        })
                    }

                </div>
            </div>
            <div className='chatBox bg-white m-4'>
                <div className="chatBoxWrapper">
                    {
                        currentChat ?
                            <>


                                <div className="chatBoxTop">
                                    {
                                        messages.map((m) => {
                                            return (
                                                <div ref={scrollRef}>

                                                    <Message message={m} own={m.sender === user._id} />
                                                </div>

                                            )
                                        })
                                    }

                                </div>
                                <div className="chatBoxBottom">
                                    <textarea
                                        className='chatMessageInput border'
                                        placeholder='write something...'
                                        onChange={(e) => setnewMessage(e.target.value)}
                                        value={newMessage}
                                    ></textarea>
                                    <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
                                </div></>
                            :
                            <span className='noConversationText'>Open a Conversation to start a chat</span>
                    }


                </div>
            </div>
          
        </div>
    )
}

export default Messenger