import React, { useEffect, useState } from 'react'
import './Message.css'
import {format} from 'timeago.js'
import axios from 'axios'

function Message({message,own}) {
    const [data,setdata]=useState()

    // useEffect(
    //     ()=>{
    //         console.log(message);
    //         console.log('messageccccccccccccccccccccczzzzzzzzzzzzzzzzzzz');
    //         const id=message.sender
    //         axios.post('https://postx.gq/api/app/senderdata',{id}).then((response)=>{
    //             setdata(response.data)
    //         })
    //     },[]
    // )
    // console.log(data);
    // console.log('data');
  
    return (
        <div className={own? "message own" : "message"}>
          
            <div className="messageTop">
            {/* <img src={`./images/${data[0]?.profilepicture}`} className='messageImg'  alt="vvv" /> */}
                <p className='messageText'>{message?.text}</p>
            </div>

            <div className="messageBottom">{format(message?.createdAt)}</div>

        </div>
    )
}

export default Message