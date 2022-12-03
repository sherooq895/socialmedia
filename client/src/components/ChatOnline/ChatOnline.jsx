import React from 'react'
import './ChatOnline.css'

function ChatOnline({onlineusers,currentId,setCurrentChat}) {

// const [friends,setFriends]=useState([])
// const [onlinefriends,setOnlineFriends]=useState([])

    return (
        <div className='chatonline'>
            <div className="chatonlinefriend">
                <div className="chatOnlineImgContainer">
                   
                    <img className='chatOnlineimg' src="https://lovelace-media.imgix.net/getty/476391743.jpg" alt="ssssss" />
                    <div className="chatOnlineBadge">

                    </div>

                </div>
                <span className="chatOnlineName">john Doe</span>
            </div>
            <div className="chatonlinefriend">
                <div className="chatOnlineImgContainer">
                   
                    <img className='chatOnlineimg' src="https://lovelace-media.imgix.net/getty/476391743.jpg" alt="ssssss" />
                    <div className="chatOnlineBadge">

                    </div>

                </div>
                <span className="chatOnlineName">john Doe</span>
            </div>
            <div className="chatonlinefriend">
                <div className="chatOnlineImgContainer">
                   
                    <img className='chatOnlineimg' src="https://lovelace-media.imgix.net/getty/476391743.jpg" alt="ssssss" />
                    <div className="chatOnlineBadge">

                    </div>

                </div>
                <span className="chatOnlineName">john Doe</span>
            </div>
        </div>
    )
}

export default ChatOnline