const express = require('express');
const router = express.Router()
const conversationSchema = require('../models/Conversation')
const signUpTemplate = require('../models/Signupmodels')



router.post('/', async (req, res) => {
    console.log(req.body, "jmkinnj");
    // const   user = await conversationSchema.find({ $all:{members: [req.body.senderId,req.body.recieverId]}})
    const   user = await conversationSchema.find({members:{$all:[req.body.senderId,req.body.recieverId]}})
console.log(user,"hh");
if(user.length>0){
    console.log('ddssd');
    res.status(200).json(true)

}else{
    const newConversation = new conversationSchema({ 
        members: [req.body.senderId, req.body.recieverId]
    })
    try {
        const savedConversaton = await newConversation.save();
        res.status(200).json(savedConversaton)
    } catch (err) {
        res.status(500).json(err)
    }
}
})

router.get("/:userId", async (req, res) => {
    console.log('kittii...kittiii');
    console.log(req.params.userId);
    console.log('reqnnnnnnnnnnnnn');
    try {
        const conversation = await conversationSchema.find({
            members: { $in: [req.params.userId] }
        })


        console.log(conversation);
        console.log('conversationvvvvvvvvvvvvvvvvvvvvvvvvv');
        res.status(200).json(conversation)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/getuser', async (req, res) => {
    const data = await signUpTemplate.findOne({ _id: req.body.friendId })
    res.status(200).json(data)
})


module.exports = router   