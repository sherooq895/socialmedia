const express=require('express') 
const app=express()
const mongoose =require('mongoose')
const dotenv=require('dotenv')
const routesUrls=require('./routes/routes')
const messagesUrls=require('./routes/messages')
const conversationUrls=require('./routes/conversation')
const adminUrls=require('./routes/admin')
const cors=require('cors')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS,()=>console.log('database connected'))

    
app.use(express.json())
app.use(cors())
app.use('/api/app',routesUrls)
app.use('/api/message',messagesUrls)
app.use('/api/conversation',conversationUrls)
app.use('/api/admin',adminUrls)
app.listen(4000,()=>console.log("server is up and running"))