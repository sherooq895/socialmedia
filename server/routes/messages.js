const express = require('express')
const router = express.Router()
const Message=require('../models/Message')


router.post('/',async(req,res)=>{
    console.log(req.body);
    console.log('req');
    const newMessage= new Message(req.body)
    try{
        const savedMessage=await newMessage.save();
        res.status(200).json(savedMessage)

    }catch(err){
        res.status(500).json(err)
    }
})

router.get("/:coversationalId",async(req,res)=>{
    try{
        const messages=await Message.find({
            conversationId:req.params.coversationalId,
        })
        res.status(200).json(messages)

    }catch(err){
        res.status(500).json(err)
    }
})
     
        

module.exports = router   