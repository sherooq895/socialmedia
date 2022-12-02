import React,{useEffect, useState} from 'react'
import './Conversation.css'
import axios from 'axios'

function Conversation({conversation,currentUser}) {

    const [user,setUser]=useState(null)



useEffect(()=>{
    const friendId=conversation.members.find((m)=>m !==currentUser._id)

    console.log(friendId);
    console.log('friendIdvvvvvvvvvvxxxxxxxxxxxxxxxxxxxxxxxx');
    
    const getUser=async ()=>{
        try{

           axios.post('http://localhost:4000/conversation/getuser',{friendId}).then((response)=>{
                console.log('shshshshshshshshshshshsh');
                console.log('shshshshshshshshshshshsh');
                console.log(response);
                console.log('response');
                setUser(response.data)

            })
        }catch(err){
            console.log(err);
        }
    }

    getUser()
}
    ,[])
    console.log(user);
    console.log('user');


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