const io=require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000"
    }
});

let users=[];

const addUser=(userId,socketId)=>{
    console.log('dsdsdd');
    !users.some(user=>user.userId===userId)&&
    users.push({userId,socketId});
}


let removeUser=(socketId)=>{
    users=users.filter(user=>user.socketId !== socketId)

} 

const getUser=(userId)=>{    
    console.log(userId);
    console.log('userIdxx');
    console.log(users);
    console.log('bbbbbbbusers'); 
    return users.find(user=>user.userId===userId)
}




io.on("connection",(socket)=>{
    console.log('A user connected.');
    socket.on("addUser",userId=>{
        addUser(userId, socket.id);
        io.emit("getUsers",users)
    })

    //SEND AND GET MESSAGE

    socket.on("sendMessage",({senderId,receiverId,text})=>{
        const user=getUser(receiverId)
        io.to(user?.socketId).emit("getMessage",{
           senderId,
            text,

        })    
    
    })
    

    // socket.on("send-notification",({senderId,receiverId})=>{

    //     console.log(senderId,"senderId");
    //     console.log(receiverId,"recevier");
    //     const user=getUser(receiverId)
    //     console.log(users,"usersw");
    //     console.log(user);
    //     console.log('user');
    
    //     io.to(user?.socketId).emit("getnotification",{
    //         senderId
            
    //      })
    
    
    // })

    socket.on('send-notifications',(data)=>{
        console.log(data,'daaaaaataa');
    const {senderid,reciverId,type}=data
    const user=users?.find(user=>user.userId===reciverId)
    console.log(users);
    console.log('users');
    console.log(user);
    console.log('userbbbbb');
    if(user){
        console.log(senderid);
        console.log('senderid');
        io.emit('get-notifications',{senderid,type})
    }

    })

   



    socket.on("disconnect",()=>{
        console.log("a user disconnected");
        removeUser(socket.id)
        io.emit("getUsers",users)
    })



})  