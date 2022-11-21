const express = require('express')
const router = express.Router()
const signUpTemplate = require('../models/Signupmodels')
const LoginTemplate = require('../models/Loginmodel')
const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const PostModelTemplate = require('../models/Postmodal')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })


function veryfyToken(req, res, next) {
    let authHeader = req.headers.authorization;
    console.log(authHeader);
    console.log('authHeader');
    if (authHeader == undefined) {
        res.status(401).send({ error: 'no token provided' })
    }

    let token = authHeader.split("")[1]

    jwt.verify(token, "secret", function (err, decoded) {
        if (err) {
            res.status(500).send({ error: 'Authentication failed' })
        } else {
            res.send(decoded)
            next();
        }
    })


}




router.post('/signup', upload.single('profilepicture'), async (request, response) => {
    try {
        console.log(request.body);
        console.log('request.body');
        console.log(request.file);
        console.log('request.file');

        const signedUpUser = new signUpTemplate({
            fname: request.body.fname,
            lname: request.body.lname,
            email: request.body.email,
            number: request.body.number,
            password: request.body.password,
            cpassword: request.body.cpassword,
            profilepicture: request.file.filename

        })

        const emailcheck = await signUpTemplate.findOne({ "email": request.body.email })

        if (emailcheck) {
            response.json({ emailerror: "email is already exist" })
        } else {

            signedUpUser.save().then(data => {
                response.status(200).json({ user: true })
            })
                .catch(error => {
                    console.log("dfghjk");
                    console.log(error);
                })

        }

    } catch (error) {
        console.log("sdfghjkl");
        console.log(error);
        response.status(200).send({ message: error })
    }

})




router.post('/login', async (request, response) => {
    try {
        const user = await signUpTemplate.findOne({ "email": request.body.email })
        console.log(user);
        console.log('user');
        if (user.password === request.body.password) {
            console.log(user);
            console.log('user');

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



})







router.post('/addpost', upload.single('image'), (req, res) => {

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


})



router.get('/getpost', async (req, res) => {
    const getpost = await PostModelTemplate.find({ "userId": req.query.userid })
    if (getpost) {
        res.status(200).send(getpost)
    } else {
        console.log('nonoooonon');
    }
})

router.get('/getallpost', async (req, res) => {
    try {
        console.log('sjsjssj');
        const getposts = await PostModelTemplate.find().populate('userId')
        // console.log(getposts);
        // console.log('getposts');
        if (getposts) {
            res.status(200).send(getposts)
        } else {
            res.status(500).send({ error: 'invalid posts' })
        }

    } catch (error) {
        console.log(error)

    }

})


router.post('/singlepost', async (req, res) => {
    console.log(req.body.image);
    console.log('req.body');
    try {
        const postdata = await PostModelTemplate.find({ 'image': req.body.image.image }).populate('userId')
        if (postdata) {
            console.log('success');
            console.log(postdata);
            res.status(200).send(postdata)
        } else {
            console.log('fail');

            res.json(500).send({ error: 'invalid post' })
        }

    } catch (err) {
        console.log(err);
    }




})

router.post('/postlike', (req, res) => {
    console.log(req.body);
    console.log('req.body');
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
})


router.post('/postdislike', (req, res) => {

    PostModelTemplate.findByIdAndUpdate(req.body.postid, {
        $pull: {
            like: req.body.useridd

        }
    }).then((response) => {
        console.log('dislike');
        res.status(200).send({ dislike: true })

    })


})

router.post('/addcomment', (req, res) => {
    console.log(req.body);
    console.log('req.bodyyyyyyyyyyyyyyyy');
    try {
        PostModelTemplate.findByIdAndUpdate(req.body.postId, {

            $push: {
                comment: {
                    comment: req.body.comment,
                    userId: req.body.userId,
                    date: new Date()
                }
            }

        }).then((response) => {
            console.log('updatedddd');

        })

    } catch (error) {
        console.log(error);
        console.log('erooorrr');
    }
})


router.post('/getallcomment', async (req, res) => {
    console.log(req.body);
    console.log('req.body');
    const comment = await PostModelTemplate.findOne({ '_id': req.body.data }).populate('userId')
    if (comment) {
        console.log(comment);
        console.log('commentshsh');
        res.status(200).send({ comment })
    } else {
        console.log('not get');
        res.status(400).send({ error: 'errorrr' })
    }

})

router.post('/userdata', async (req, res) => {
    console.log(req.body);
    console.log('req.bodyyyyyy');
    const userdata = await signUpTemplate.findOne({ '_id': req.body.userid })
    if (userdata) {
        console.log(userdata);
        console.log('userdata');
        res.status(200).send({ userdata })
    } else {
        console.log('nodata');
        res.status(400).send({ error: 'errorrr' })
    }

})

router.post('/editprofile', (req, res) => {
    console.log(req.body);
    console.log('req.bodywwwwwwwwww');
    try {

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
            console.log('updated');
            res.status(200).send(response)
        })

    } catch (error) {
        console.log(error);
        console.log('error');
        res.status(400).send({ error: 'not updated' })
    }
})

router.post ('/geteditpostdata', async(req, res) => {
    try {
        console.log('req.bodyyyyyyyyyyyy');
        console.log(req.body);
        const data =await PostModelTemplate.findOne({ '_id': req.body.data })
        if (data) {
            console.log(data);
            console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
            res.status(200).send(data)
        } else {
            console.log('errorr');
        }

    } catch (error) {
        console.log('error');
        console.log(error);
    }


})

router.post('/editpost',(req,res)=>{
    console.log(req.body);
    console.log('req.bodyyyyyyyyyyy');
    PostModelTemplate.findByIdAndUpdate(req.body.alldata._id,
        {
            $set:{
                description:req.body.alldata.description
            }
        }).then((response)=>{
            console.log('updateddddddd');
            console.log('updateddddddd');

        })

})

router.post('/deletepost',(req,res)=>{
    console.log(req.body);
    console.log('req.bodyyyyyyyyyyy');
    PostModelTemplate.deleteOne({'_id':req.body.data}).then((response)=>{
            console.log('deleteeeeee');
            res.status(200).send({deleted})

        })

})
         













module.exports = router   