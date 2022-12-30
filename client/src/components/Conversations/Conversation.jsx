import React,{useEffect, useState} from 'react'
import './Conversation.css'
import axios from 'axios'

function Conversation({conversation,currentUser}) {

    const [user,setUser]=useState(null)



useEffect(()=>{
    const friendId=conversation.members.find((m)=>m !==currentUser._id)
    const getUser=async ()=>{
        try{

           axios.post('https://postx.gq/api/conversation/getuser',{friendId}).then((response)=>{
                setUser(response.data) })
        }catch(err){
            console.log(err);
        }
    }
    getUser()},[])
   


  return (
    <>
     <div className='conversation'>
        <img className='coversationImg'  src={`/images/${user?.profilepicture}`} alt="ssssss" />
        <span className='conversationName'>{user?.fname}</span>
    </div>
   
    </>
   
  )
}

export default Conversation