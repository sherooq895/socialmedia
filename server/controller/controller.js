const express = require('express')
const router = express.Router()
const signUpTemplate = require('../models/Signupmodels')
const LoginTemplate = require('../models/Loginmodel')
//  const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const PostModelTemplate = require('../models/Postmodal')
const nodemailer = require("nodemailer");





const emailsend = async (data) => {

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
                otp: ''


            })



            const emailcheck = await signUpTemplate.findOne({ "email": request.body.email })

            if (emailcheck) {
                console.log("emailcheck");
                response.json({ emailerror: "email is already exist" })
                console.log(emailcheck);
            } else {

                // //nodemailer

                signedUpUser.save().then((responsee) => {
                    emailsend(responsee).then((data) => {

                        response.status(200).json({ user: true, id: responsee._id })
                    })
                })
                    .catch(error => {
                        console.log(error);
                    })

            }

        } catch (error) {
            console.log(error);
            response.status(200).send({ message: error })
        }
    },

    isauth: (req, res) => {
        console.log('isauthisauthhhh');
        res.status(200).json({ auth: true })

    },


    login: async (request, response) => {
        try {
            console.log(request.body);
            console.log('bodyyyyy');
            const user = await signUpTemplate.findOne({ email: request.body.email })

            console.log(user);
            console.log('userccccccccc');

            if (user.password == request.body.password) {

                console.log("user true");

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
                response.status(500).json({ loginerror: "ivalid username and password" })
            }

        } catch (error) {

            response.status(200).send({ message: error })

        }



    },
    addpost: (req, res) => {
        try {

            const post = new PostModelTemplate({
                image: req.file.filename,
                description: req.body.description,
                userId: req.query.useridd,
                date: req.query.date

            })

            post.save().then(response => {
                console.log('uploaded');
                res.status(200).json({ user: true })
            })

        } catch (error) {
            console.log(error);
        }


    },

    getpost: async (req, res) => {

        console.log(req.query.userid);
        const getpost = await PostModelTemplate.find({ 'userId': req.query.userid }).clone()
        if (getpost) {
            res.status(200).send(getpost)
        } else {
            console.log('nonoooonon');
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
            console.log(err);
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
            console.log(error);
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
            res.status(500).send(error)
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
        }


    },

    editprofile: async (req, res) => {

        try {
            console.log(req.body.register);
            console.log('req.body.register');
            const useremail = await signUpTemplate.findOne({ 'email': req.body.register.email })
            if (useremail) {
                res.json(error)
            } else {

                signUpTemplate.findByIdAndUpdate(req.body.register._id, {
                    $set: {
                        fname: req.body.register.fname,
                        lname: req.body.register.lname,
                        email: req.body.register.email,
                        number: req.body.register.number,
                        password: req.body.register.password,
                        cpassword: req.body.register.cpassword,
                        profilepicture: req.body.register.profilepicture,
                        discription: req.body.register.discription,

                    }
                }).then((response) => {
                    res.json(response)
                })
            }



        } catch (error) {
            res.status(400).send({ error: 'not updated' })
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
        }
    },

    getusers: async (req, res) => {
        try {
            const userdetails = await signUpTemplate.find()
            res.status(200).send(userdetails)

        } catch (error) {
            console.log(error);
        }

    },

    getuserprofile: async (req, res) => {
        try {

            const datas = await signUpTemplate.findOne({ '_id': req.body.data })

            res.status(200).send({ datas })

        } catch (error) {
            console.log(error);
        }

    },

    getuserprofileposts: async (req, res) => {
        try {

            const posts = await PostModelTemplate.find({ userId: req.body.data })
            if (posts) {
                res.status(200).send(posts)
            } else {
                res.status(500).send({ error: 'not find posts' })
            }


        } catch (error) {
            console.log(error);

        }

    },
    deletepost: (req, res) => {
        try {
            PostModelTemplate.deleteOne({ '_id': req.body.data }).then((response) => {
                res.status(200).send(' deleted')

            })


        } catch (error) {
            console.log(error);
        }
    },
    followrequest: async (req, res) => {
        console.log('req.body')
        console.log(req.body)
        console.log('req.body')

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




    },
    getuserdata: async (req, res) => {

        console.log(req.body)
        console.log('reqbody')

        const data = await signUpTemplate.findOne({ '_id': req.body.data })
        console.log(data);
        console.log('dataxjxjxx');
        res.json(data)


    },
    getuserdataa: async (req, res) => {
        console.log(req.body);
        console.log('ddddddddddddreqbody');
        const data = await signUpTemplate.findOne({ '_id': req.body.dataa })
        console.log(data);
        console.log('dataxjxjxx');
        res.json(data)

    },

    unfollowrequest: async (req, res) => {
        console.log(req.body);
        console.log('hshshsh');
        await signUpTemplate.findByIdAndUpdate(req.body.data.userdataid, {
            $pull: {
                follower: req.body.data.userid
            }
        })
        await signUpTemplate.findByIdAndUpdate(req.body.data.userid, {
            $pull: {
                following: req.body.data.userdataid
            }
        })


            .then((response) => {
                console.log('unfolllllw');
                res.json(response)
            })
    },

    getloguser: async (req, res) => {
        console.log(req.body);
        console.log('ssssssss');

        const data = await signUpTemplate.findOne({ '_id': req.body.userdataaa })

        console.log(data);
        console.log('datasaaaaaaaaaaaaaaaaaasassssssssssssss');
        res.json(data)



    },

    followback: async (req, res) => {
        console.log(req.body);
        console.log('sdsdsdsdsdsddsdsdsds');

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

    },

    loguser: async (req, res) => {


        const datalog = await signUpTemplate.findOne({ _id: req.body.logid })

        res.json(datalog)
    },
    verifyotp: async (req, res) => {
        console.log(req.body);
        console.log('sjsjsjsjsjsjsjsjsjsjsjsjsj');

        const user = await signUpTemplate.findOne({ _id: req.body.otpp.id })
        console.log(user);
        if (user.otp === req.body.otpp.otpp) {
            console.log('otpsuccessfully');
            await signUpTemplate.findByIdAndUpdate(req.body.otpp.id, {
                $set: {
                    otpstatus: 'true'

                }
            }).then((response) => {

                res.json({ user: true })

            })
        } else {
            console.log('otpfaillllll');
            res.json({ error: 'otp is incurrect' })
        }







    },
    getfollowers: async (req, res) => {
        console.log(req.body);
        console.log('dsdsdsdsd');

        const data = await signUpTemplate.find({'_id':req.body.data})
        // res.status(200).json(data)
        console.log(data);
        console.log('data');
      
        console.log('data');
        res.status(200).json(data)

    },
    getfollowing: async (req, res) => {

        const data = await signUpTemplate.find({'_id':req.body.data})
      
        res.status(200).json(data)

    }

}











