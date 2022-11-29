const express = require('express')
const router = express.Router()
const signUpTemplate = require('../models/Signupmodels')
const LoginTemplate = require('../models/Loginmodel')
const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const PostModelTemplate = require('../models/Postmodal')
const controller = require('../controller/controller')


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
   
    let authHeader = req.headers.token;
    // console.log(authHeader);
    
    
    if (!authHeader) {
        res.json({auth: false, error:"We need a token, please give it to us next time"});
    } else {
        let token = authHeader.split(" ")[1];
        if (authHeader == undefined) {
            res.json({ auth: false, error: 'no token provided' })
        }
        jwt.verify(token, "secret", function (err, decoded) {
            if (err) {
                res.json({ auth: false, error: 'Authentication failed' })
            } else {
                next()
            }
        })
    }
}




router.get('/isauth', veryfyToken, controller.isauth)
router.post('/signup', upload.single('profilepicture'), controller.signup)
     
router.post('/login', controller.login)

router.post('/addpost',  upload.single('image'), controller.addpost)

router.get('/getpost', controller.getpost)

router.get('/getallpost', veryfyToken, controller.getallpost)

router.post('/singlepost', veryfyToken, controller.singlepost)

router.post('/postlike', veryfyToken, controller.postlike)

router.post('/postdislike', veryfyToken, controller.postdislike)

router.post('/addcomment',  controller.addcomment)

router.post('/getallcomment',  controller.getallcomment)

router.post('/userdata', controller.userdata)

router.post('/editprofile',upload.single('profilepicture'), controller.editprofile)

router.post('/geteditpostdata',  controller.geteditpostdata)

router.post('/editpost' ,controller.editpost)

router.post('/deletepost',  controller.deletepost)

router.get('/getusers', veryfyToken, controller.getusers)

router.post('/getuserprofile', veryfyToken, controller.getuserprofile)

router.post('/getuserprofileposts', veryfyToken, controller.getuserprofileposts)

router.post('/followrequest',veryfyToken,controller.followrequest)

router.post('/getuserdata',controller.getuserdata)

router.post('/getuserdataa',controller.getuserdataa)

router.post('/unfollowrequest',controller.unfollowrequest)

router.post('/getloguser',controller.getloguser)

router.post('/followback',controller.followback)

router.post('/loguser',controller.loguser)

router.post('/verifyotp',controller.verifyotp)


  

module.exports = router   