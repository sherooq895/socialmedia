import React, { useContext, useEffect, useState,useRef } from 'react'
import Conversation from '../Conversations/Conversation'
import Message from '../Message/Message'
import ChatOnline from '../ChatOnline/ChatOnline'
import "./Messenger.css"
import axios from 'axios'
import jwt_decode from 'jwt-decode'

function Messenger() {
    const userr = localStorage.getItem('token')
    const userdata = jwt_decode(userr)
    console.log(userdata.id);
    console.log('userdata');
    const logid = userdata.id

    const [user, setuser] = useState({})
    const [conversations, setconversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setmessages] = useState([])
    const [newMessage, setnewMessage] = useState('')
    const scrollRef=useRef();

    useEffect(

        () => {
            axios.post('http://localhost:4000/app/loguser', { logid }).then((response) => {
                setuser(response.data)
            })

            const getConversations=async ()=>{

                console.log(user._id);
                console.log('cccccccccccccccccccccc');
                try{

                    const res=await axios.get("http://localhost:4000/conversation/"+user._id)
                  
                    setconversations(res.data)
                }catch(err){
                    console.log(err);
                    
                }
            }

            getConversations()


        }, [user._id]

    )
    

    useEffect(()=>{
        const getMessages=async ()=>{
            try{
                const res= await axios.get("http://localhost:4000/message/"+currentChat?._id)
                setmessages(res.data)

            }catch(err){
                console.log(err);
            }

        }
        getMessages()

    },[currentChat])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour:"smooth"})

    },[messages])

 const handleSubmit=async (e)=>{
    e.preventDefault();
    const message={
        sender:user._id,
        text:newMessage,
        conversationId:currentChat._id
    }
    try{
        const res=await axios.post('http://localhost:4000/message',message);
        setmessages([...messages,res.data])
        setnewMessage("")
    }catch(err){
        console.log(err);
    }

}


    console.log(currentChat);
    console.log(user._id);
    console.log('currentChatllllllllllllllllllllllllll');
    return (
        <div className='messenger'>
            <div className='chatMenu'>
                <div className="chatMenuWrapper">
                    <input placeholder='Search for friends' type="text" className='chatMenuInput' />
                    {
                        conversations.map((c)=>{
                            return(
                                <div onClick={()=>setCurrentChat(c)}>

                                    <Conversation conversation={c} currentUser={user}/>
                                </div>

                            )
                        })
                    }

                </div>
            </div>
            <div className='chatBox'>
                <div className="chatBoxWrapper">
                    {
                        currentChat?
                        <>
                   
                    <div className="chatBoxTop">
                        {
                            messages.map((m)=>{
                                return(
                                    <div ref={scrollRef}>

                                        <Message message={m} own={m.sender===user._id}/>
                                    </div>

                                )
                            })
                        }
                     
                        <Message />
                    </div>
                    <div className="chatBoxBottom">
                        <textarea
                         className='chatMessageInput'
                          placeholder='write something...'
                          onChange={(e)=>setnewMessage(e.target.value)}
                          value={newMessage}
                          ></textarea>
                        <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
                    </div></>
                    :
                    <span className='noConversationText'>Open a Conversation to start a chat</span>
                     }


                </div>
            </div>
            <div className='chatOnline'>
                <div className="chatOnlineWrapper">
                    <ChatOnline />


                </div>
            </div>
        </div>
    )
}

export default Messenger