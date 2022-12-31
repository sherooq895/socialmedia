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
    const token = localStorage.getItem('token')

    const logid = userdata.id

    const [user, setuser] = useState({})
    const [conversations, setconversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setmessages] = useState([])
    const [newMessage, setnewMessage] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [chatuserdata, setchatuserdata] = useState([])
    const scrollRef = useRef();
    const socket = useRef();

    useEffect(() => {
        // socket.current = io("ws://localhost:8900");
        socket.current = io("https://postx.gq",{path:"/socket/socket.io"});
        // export const socket = io('https://happynest.tk',{path:"/socket/socket.io"})  


        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, []);

    console.log(setCurrentChat);
    console.log('setCurrentChatxxxxxxxxxxx');

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setmessages((prev) => [...prev, arrivalMessage])
        getuserdata()
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        axios.post('https://postx.gq/api/app/loguser', { logid }, {
            headers: { token: `Bearer ${token}` },
        }).then((response) => {
            setuser(response.data)
        })

        const getConversations = async () => {
            try {
                const res = await axios.get("https://postx.gq/api/conversation/" + user._id)
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

    console.log(onlineUsers);
    console.log('onlineUsersvzvzvzvzvzvzzvzvzv');



    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("https://postx.gq/api/message/" + currentChat?._id)
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
        const receiverId = currentChat.members.find(member => member !== user._id)

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,


        })
        try {
            const res = await axios.post('https://postx.gq/api/message', message);
            setmessages([...messages, res.data])
            setnewMessage("")
        } catch (err) {
            console.log(err);
        }

    }


    const getuserdata =async () => {

        const receiverId = currentChat?.members?.find(member => member !== logid)

        console.log(receiverId);
        console.log('receiverIdxxxxx');

        axios.post('https://postx.gq/api/app/getcurrentuserdatax', { receiverId }, {
            headers: { token: `Bearer ${token}` },
        }).then(async(response) => {
            console.log(response.data);
            console.log('gfgfgfgfgfgfg');
            setchatuserdata(response.data)
            console.log(onlineUsers);
            console.log('onlineUsersbbbbbbbbbbbbbbbbbbbbb');
            console.log(chatuserdata);
            console.log('chatuserdatabbbbbbbbbbbbbbbbbbbb');



        })


    }

    console.log(conversations);
    console.log('conversationsxxx');








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


                                <div className='flex ml-6 mt-3'>
                                    <div >
                                        <img className='messageImg' src={`./images/${chatuserdata?.profilepicture}`} alt="vvv" />

                                    </div>
                                    <div>
                                        <div className='text-xl'>
                                            {chatuserdata?.fname}
                                        </div>
                                        <div>
                                            {
                                                onlineUsers?.find(data => data.userId==chatuserdata?._id) ?

                                                    <div className='text-green-800 '>Online</div> :
                                                    <div className='text-black text-sm'>Offline</div>
                                            }
                                        </div>

                                    </div>

                                </div>

                                <hr className='w-[80%] h-.4 bg-slate-400 ml-6 mt-4' />



                                <div className="chatBoxTop">
                                    {



                                        messages.map((m) => {
                                            return (
                                                <>




                                                    <div ref={scrollRef}>

                                                        <Message message={m} own={m.sender === user._id} />


                                                    </div>

                                                </>

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