const express = require('express')
const router = express.Router()
const signUpTemplate = require('../models/Signupmodels')
const LoginTemplate = require('../models/Loginmodel')
const AdminTemplate = require('../models/Adminlogin')
const Notificationtemplate = require('../models/Notification')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const PostModelTemplate = require('../models/Postmodal')
const nodemailer = require("nodemailer");
// const { now, default: mongoose } = require('mongoose')
const mongoose=require('mongoose')





const emailsend = async (data) => {

    console.log(data);
    console.log('databbbbbbbbbbbbbbbbbbbbbbbbbb');

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'testshrq@gmail.com',
            pass: 'pfdxyxspayvomzff',
        },
    });

    var otp = Math.floor(Math.random() * (9000000));

    let info = await transporter.sendMail({
        from: '"nodemailer contact" <testshrq@gmail.com>',
        to: data.email,
        subject: "OTP VERIFICATION",
        text: "Hello world?",
        html: `YOUR OTP IS ${otp}`,
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    signUpTemplate.findByIdAndUpdate(data._id, {
        $set: {
            otp: otp
        }

    }).then((response) => {
        console.log('update');
        // res.json({user:true})
    })




}



module.exports = {
    signup: async (request, response) => {
        console.log("ghjjjj");
        try {
            const signedUpUser = new signUpTemplate({
                fname: request.body.fname,
                lname: request.body.lname,
                email: request.body.email,
                number: request.body.number,
                password: request.body.password,
                cpassword: request.body.cpassword,
                profilepicture: request.file.filename,
                otpstatus: 'false',
                otp: '',
                blocked: 'false'
            })

            const emailcheck = await signUpTemplate.findOne({ "email": request.body.email })

            if (emailcheck) {
                console.log("emailcheck");
                response.json({ emailerror: "email is already exist" })
                console.log(emailcheck);
            } else {

                signedUpUser.save().then((responsee) => {
                    emailsend(responsee).then((data) => {
                        response.status(200).json({ user: true, id: responsee._id, response: responsee })
                    })
                })
                    .catch(error => {
                        console.log(error);
                    })
            }
        } catch (error) {
            console.log(error);
            response.status(500).send({ message: error })
        }
    },

    isauth: (req, res) => {
        console.log('isauthisauthhhh');
        res.status(200).json({ auth: true })

    },

    adminlogin: async (req, res) => {
        const email = 'admin@gmail.com'
        const password = '123'
        if (email == req.body.email && password == req.body.password) {
            const resp = {
                email: email,
            }
            let admintoken = jwt.sign(resp, "adminsecret")
            res.status(200).json({ admin: true, auth: true, token: admintoken })
        } else {
            req.json({ error: "invalid email and password" })
        }
    },

    resendotp: async (req, res) => {
        try {
            emailsend(req.body).then((response) => {
                res.json({ resend: true })
            })

        } catch (error) {
            res.status(500).send({ error: true })
        }
    },




    login: async (request, response) => {
        try {

            const user = await signUpTemplate.findOne({ email: request.body.email })

            console.log(user);
            console.log('user');

            if (user.password == request.body.password && user.otpstatus == 'true' && user.blocked==false) {
                const resp = {
                    id: user._id,
                    email: user.email,
                    fname: user.fname,
                    profilepicture: user.profilepicture
                }
                let token = jwt.sign(resp, "secret")
                response.status(200).json({ user, auth: true, token: token })
            } else {
                console.log("error");
                response.json({ loginerror: "ivalid username and password" })
            }

        } catch (error) {

            response.status(500).send({ message: error })

        }



    },
    addpost: (req, res) => {
        try {
            const post = new PostModelTemplate({
                image: req.file?.filename,
                description: req.body?.description,
                userId: req.query.useridd,
                date: req.query.date,
                block: false
            })
            post.save().then(response => {
                res.status(200).json({ user: true })
            })

        } catch (error) {
            res.status(500).json({ error: true })
        }
    },



    getpost: async (req, res) => {

        try {
            const getpost = await PostModelTemplate.find({ 'userId': req.query.userid }).clone()
            if (getpost) {
                res.status(200).send(getpost)
            } else {
                console.log('nonoooonon');
            }

        } catch (error) {
            res.status(500).json({ error: true })
        }

    },

    getallpost: async (req, res) => {
        try {
            console.log('sjsjssj');
            const getposts = await PostModelTemplate.find().populate({
                path: 'comment',
                populate: {
                    path: 'userId'
                }
            }).populate('userId')
            console.log(getposts[0].comment);
            console.log('getpostsssssspopulateeeeeeeeeeeee');

            if (getposts) {
                res.status(200).send(getposts)
            } else {
                res.status(500).send({ error: 'invalid posts' })
            }

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: true })

        }

    },

    singlepost: async (req, res) => {

        try {
            const postdata = await PostModelTemplate.find({ 'image': req.body.image.image }).populate({
                path: 'comment',
                populate: {
                    path: 'userId'
                }
            }).populate('userId')
            if (postdata) {
                res.status(200).send(postdata)
            } else {

                res.json(500).send({ error: 'invalid post' })
            }

        } catch (err) {

            res.status(500).json({ error: true })

        }


    },

    postlike: (req, res) => {
        console.log(req.body);
        console.log(' likebody');
        try {

            PostModelTemplate.findByIdAndUpdate(req.body.postid, {
                $push: {
                    like: req.body.useridd

                }
            }).then((response) => {
                console.log('like');
                res.status(200).send({ like: true })
            })
        } catch (error) {

            res.status(500).json({ error: true })
        }
    },


    postdislike: (req, res) => {
        try {
            PostModelTemplate.findByIdAndUpdate(req.body.postid, {
                $pull: {
                    like: req.body.useridd

                }
            }).then((response) => {
                res.status(200).send({ dislike: true })

            })

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: true })


        }

    },


    addcomment: async (req, res) => {
        try {
            const comment = await PostModelTemplate.findByIdAndUpdate(req.body.postId, {

                $push: {
                    comment: {
                        comment: req.body.comment,
                        userId: req.body.userId,
                        date: new Date()
                    }
                }

            })
            console.log('comment', comment);
            res.json(comment)
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: true })

        }

    },

    getallcomment: async (req, res) => {
        try {

            const comment = await PostModelTemplate.findOne({ '_id': req.body.data }).populate({
                path: 'comment',
                populate: {
                    path: 'userId'
                }
            }).populate('userId')
            console.log(comment);
            console.log('comments');
            if (comment) {
                res.status(200).send({ comment })
            } else {
                res.status(400).send({ error: 'errorrr' })
            }


        } catch (error) {
            console.log(error);
            res.status(500).json({ error: true })

        }

    },

    userdata: async (req, res) => {
        try {
            const userdata = await signUpTemplate.findOne({ '_id': req.body.userid })
            if (userdata) {
                res.status(200).send({ userdata })
            } else {
                res.status(400).send({ error: 'errorrr' })
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: true })

        }


    },

    editprofile: async (req, res) => {

        try {
            console.log(req.body);
            console.log('req.body.register');
            const useremail = await signUpTemplate.findOne({ 'email': req.body.email })
            if (useremail) {
                res.json({ error: true })
            } else {

                signUpTemplate.findByIdAndUpdate(req.body._id, {
                    $set: {
                        fname: req.body?.fname,
                        lname: req.body?.lname,
                        email: req.body?.email,
                        number: req.body?.number,
                        password: req.body?.password,
                        cpassword: req.body?.cpassword,
                        profilepicture: req.file?.filename,
                        discription: req.body?.discription,

                    }
                }).then((response) => {
                    res.json(response)
                })
            }



        } catch (error) {
            res.status(500).json({ error: true })

        }

    },

    geteditpostdata: async (req, res) => {
        console.log('sdsdsdsds');
        try {
            const data = await PostModelTemplate.findOne({ '_id': req.body.data })
            if (data) {
                console.log('dataaaaaaaaaa');
                console.log(data);
                res.json(data)
            } else {
                console.log('errorr');
                res.json('error')

            }

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: true })

        }

    },
    editpost: (req, res) => {
        try {

            PostModelTemplate.findByIdAndUpdate(req.body.alldata._id,
                {
                    $set: {
                        description: req.body.alldata.description
                    }
                }).then((response) => {
                    console.log('updateddddddd');
                    res.status(200).send(response)

                })

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: true })

        }
    },

    getusers: async (req, res) => {
        try {
            const userdetails = await signUpTemplate.find()
            res.status(200).send(userdetails)

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: true })

        }

    },

    getuserprofile: async (req, res) => {
        try {

            const datas = await signUpTemplate.findOne({ '_id': req.body.data })

            res.status(200).send({ datas })

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: true })

        }

    },

    getuserprofileposts: async (req, res) => {
        try {

            const posts = await PostModelTemplate.find({ userId: req.body.id })
            if (posts) {
                res.status(200).send(posts)
            } else {
                res.status(500).send({ error: 'not find posts' })
            }


        } catch (error) {
            console.log(error);
            res.status(500).json({ error: true })

        }

    },
    deletepost: (req, res) => {
        try {
            PostModelTemplate.deleteOne({ '_id': req.body.data }).then((response) => {
                res.status(200).send(' deleted')

            })


        } catch (error) {
            console.log(error);
            res.status(500).json({ error: true })

        }
    },
    followrequest: async (req, res) => {

        try {

            await signUpTemplate.findByIdAndUpdate(req.body.data.userdataid, {
                $push: {
                    follower: req.body.data.userid
                }
            })
            await signUpTemplate.findByIdAndUpdate(req.body.data.userid, {
                $push: {
                    following: req.body.data.userdataid
                }
            })


                .then((response) => {
                    console.log('response');
                    res.status(200).send(response)
                })

        } catch (error) {
            res.status(500).json({ error: true })
        }





    },
    getuserdata: async (req, res) => {
        try {
            const data = await signUpTemplate.findOne({ '_id': req.body.data })
            res.json(data)
        } catch (error) {
            res.status(500).json({ error: true })
        }
    },
    getuserdataa: async (req, res) => {
        try {
            const data = await signUpTemplate.findOne({ '_id': req.body.userdata })
            res.json(data)
        } catch (error) {
            res.status(500).json({ error: true })
        }
    },

    unfollowrequest: async (req, res) => {

        try {

            await signUpTemplate.findByIdAndUpdate(req.body.data.userdataid, {
                $pull: {
                    follower: req.body.data.userid
                }
            })
            await signUpTemplate.findByIdAndUpdate(req.body.data.userid, {
                $pull: {
                    following: req.body.data.userdataid
                }
            }).then((response) => {
                res.json(response)
            })
        } catch (error) {
            res.status(500).json({ error: true })
        }
    },

    getloguser: async (req, res) => {
        try {
            const data = await signUpTemplate.findOne({ '_id': req.body.userdataaa })
            res.json(data)
        } catch (error) {
            res.status(500).json({ error: true })
        }
    },

    followback: async (req, res) => {

        try {
            await signUpTemplate.findByIdAndUpdate(req.body.data.userdataid, {
                $push: {
                    follower: req.body.data.userid
                }
            }
            )
            await signUpTemplate.findByIdAndUpdate(req.body.data.userid, {
                $push: {
                    following: req.body.data.userdataid
                }
            }).then((response) => {
                res.json(response)
            })
        } catch (error) {
            res.status(500).json({ error: true })
        }
    },

    loguser: async (req, res) => {

        try {
            const datalog = await signUpTemplate.findOne({ _id: req.body.logid })
            res.json(datalog)
        } catch (error) {
            res.status(500).json({ error: true })
        }
    },
    verifyotp: async (req, res) => {
        try {
            console.log(req.body);
            const user = await signUpTemplate.findOne({ _id: req.body.otpp.id })
            console.log(user);
            if (user.otp === req.body.otpp.otpp) {
                await signUpTemplate.findByIdAndUpdate(req.body.otpp.id, {
                    $set: {
                        otpstatus: 'true'
                    }
                }).then((response) => {

                    res.json({ user: true })
                })
            } else {
                res.json({ error: 'otp is incurrect' })
            }
        } catch (error) {
            res.status(500).json({ error: true })
        }
    },
    getfollowers: async (req, res) => {
        try {
            const data = await signUpTemplate.find({ '_id': req.body.data })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ error: true })
        }
    },
    getfollowing: async (req, res) => {
        try {
            const data = await signUpTemplate.find({ '_id': req.body.data })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ error: true })
        }
    },
    getuserpicture: async (req, res) => {
        try {
            const data = await PostModelTemplate.findOne({ _id: req.body.imgId.id })
                .populate({
                    path: 'comment',
                    populate: {
                        path: 'userId'
                    }
                })
                .populate('userId')
            res.json(data)
        } catch (error) {
            res.status(500).json({ error: true })
        }
    },
    getonlineuser: async (req, res) => {
        try {
            const userdataa = await Promise.all(req.body.map((person) => {
                return (
                    signUpTemplate.find({ '_id': person.userId })
                )
            }))
            res.json(userdataa)
        } catch (error) {
            res.status(500).json({ error: true })
        }
    },
    senderdata: async (req, res) => {
        try {
            const data = await signUpTemplate.find({ '_id': req.body.id })
            res.json(data)
        } catch (error) {
            res.status(500).json({ error: true })
        }
    },
    searchuser: async (req, res) => {
        try {
            const data = await signUpTemplate.find({ fname: new RegExp(req.body.data, "i") })
            if (data.length !== 0) {
                res.json(data)
            } else {
                res.json({ error: 'no search result' })
            }
        } catch (error) {
            console.log(error);
        }
    },
    reportpost: async (req, res) => {
        try {
            PostModelTemplate.findByIdAndUpdate(req.body?.postId,
                {
                    $push: {
                        report: req.body?.userId
                    }
                }
            ).then((response) => {
                res.json({ report: true })
            })
        } catch (error) {
            res.status(500).json({ error: true })
        }
    },
    getallreportpost: async (req, res) => {
        try {
            const data = await PostModelTemplate.find().populate('userId')
            res.json(data)
        } catch (error) {
            res.status(500).json({ error: true })
        }
    },
    postblock: async (req, res) => {
        try {
            PostModelTemplate.findByIdAndUpdate(req.body.postId, {
                $set: {
                    block: 'true'
                }
            }).then((response) => {
                res.json({ blocked: true })
            })
        } catch (error) {
            res.status(500).json({ error: true })
        }
    },
    postunblock: async (req, res) => {
        try {
            PostModelTemplate.findByIdAndUpdate(req.body.postId, {
                $set: {
                    block: 'false'
                }
            }).then((response) => {
                res.json({ unblocked: true })
            })

        } catch (error) {
            res.status(500).json({ error: true })
        }
    },
    reportuser: async (req, res) => {
        try {
            signUpTemplate.findByIdAndUpdate(req.body.userid, {
                $push: {
                    report: req.body.logid
                }
            }).then((response) => {
                res.json({ report: true })
            })

        } catch (error) {
            res.status(500).json({ error: true })
        }
    },
    getallreportuser: async (req, res) => {
        try {
            const data = await signUpTemplate.find()
            res.json(data)
        } catch (error) {
            res.status(500).json({ error: true })
        }
    },

    blockuser: async (req, res) => {
        try {
            signUpTemplate.findByIdAndUpdate(req.body.data, {
                $set: {
                    blocked: true
                }
            }).then((response) => {
                res.json({ blocked: true })
            })
        } catch (error) {
            res.status(500).json({ error: true })
        }
    },
    unblockuser: async (req, res) => {
        try {
            signUpTemplate.findByIdAndUpdate(req.body.data, {
                $set: {
                    blocked: false
                }
            }).then((response) => {
                res.json({ unblocker: true })
            })
        } catch (error) {
            res.status(500).json({ error: true })
        }
    },
    getcurrentuserdatax: async (req, res) => {
        console.log(req.body);
        console.log('reqccccccccccccccccccccccc');
        // const data=await signUpTemplate.find({'_id':req.body.receiverId})
        // res.json(data)    
    },
    sendnotification: async (req, res) => {
        console.log(req.body);
        console.log('sdsdsdsdsdsd');

        const user = await Notificationtemplate.findOne({ userid: req.body.postuser })
        if (user) {
            const data = await Notificationtemplate.findOneAndUpdate({ userid: req.body.postuser },
                {
                    $push: {
                        Notification: {
                            actionuser: req.body.useridd,
                            type: req.body.type,
                            date: new Date(),
                            status:'true'

                        }
                    }
                })
        } else {
            const notification = new Notificationtemplate({
                userid: req.body.postuser,
                Notification: {
                    actionuser: req.body.useridd,
                    type: req.body.type,
                    date: new Date(),
                    status:'true'
                }
            })
            notification.save().then((response) => {
                console.log('response');
            })
        }
    },
    getnotification: async (req, res) => {
        const data = await Notificationtemplate.findOne({ userid: req.body.logid }).populate({
            path: 'Notification',
            populate: {
                path: 'actionuser'
            }
        })
        if (data) {
            console.log('get');
            res.json(data)
        } else {
            res.json({ notget: true })
            console.log('notget');
        }


    },
    statusfalse:async(req,res)=>{
        const data = await Notificationtemplate.updateOne({ userid: req.body.logid, Notification : { "$elemMatch": { "status" : "true" }} }, {
            $set: {
                "Notification.$.status" : "false"
            }
        }, { "multi": true })     

            if(data){    
                res.json({changed:true})
            }else{
                res.json({notchanged:true})
            }
    }
}











