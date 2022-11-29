const mongoose=require('mongoose')
const Schema = mongoose.Schema;

const signUpTemplate= new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    profilepicture:{
        type:String,
        
    },
    discription:{
        type:String
    },
    following:[{
        type:String
       
    }],
    follower:[{
        type:String
    }],
    otpstatus:{
        type:String
    },
    otp:{
        type:String
    }


})

module.exports = mongoose.model('signups',signUpTemplate)