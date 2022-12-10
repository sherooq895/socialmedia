const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const signUpTemplate = require('./Signupmodels')




const userPostTemplate = new mongoose.Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: signUpTemplate
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    like: [{
        type: String
    }],
    comment: [{
        comment: {
            type: String
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: signUpTemplate
        },
        date: {
            type: Date
        }

    }],
    report:[
       { type:String}
    ],
    block:{
        type:Boolean
    }
})



module.exports = mongoose.model('Posts', userPostTemplate)