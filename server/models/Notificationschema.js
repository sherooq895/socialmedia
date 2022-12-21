const mongoose = require('mongoose')
const user=require('./Signupmodels')

const notificationschema=new mongoose.Schema({
    userId:{
        type:String
    },
    Notification:[{
        user:{
            type:String,
            ref:user
        },
      
        time:{
            type:Date
        },
        readStatus:{
            type:Boolean,
            default:false
        },
        type:{
            type:String
        }

    }]
})


const notification=mongoose.model("notify",notificationschema)
module.exports=notification
