import React from 'react'
import './Message.css'
import {format} from 'timeago.js'

function Message({message,own}) {
    console.log(message);
    console.log('message');
    console.log(own);
    console.log('own');
    return (
        <div className={own? "message own" : "message"}>
          
            <div className="messageTop">
                <img className='messageImg' src="https://lovelace-media.imgix.net/getty/476391743.jpg" alt="vvv" />
                <p className='messageText'>{message?.text}</p>
            </div>

            <div className="messageBottom">{format(message?.createdAt)}</div>

        </div>
    )
}

export default Message