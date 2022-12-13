const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const signUpTemplate = require('./Signupmodels')


const NotificationTemplate = new mongoose.Schema({

    userid: {
        type: String
    },

    Notification: [
        {
            actionuser: {
                type: Schema.Types.ObjectId,
                ref: signUpTemplate
            },
            type:{
                type:String
            },
            date:{
                type:Date
            },
            status:{
                type:String
            }
        }
    ],
})

module.exports = mongoose.model('notification', NotificationTemplate)