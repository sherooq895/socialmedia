const express = require('express')
const router = express.Router()
const signUpTemplate = require('../models/Signupmodels')
const LoginTemplate = require('../models/Loginmodel')
const jwt = require('jsonwebtoken')
const controller = require('../controller/controller')



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
        jwt.verify(token, "adminsecret", function (err, decoded) {
            if (err) {
                res.json({ auth: false, error: 'Authentication failed' })
            } else {
                next()
            }
        })
    }
}



router.post('/login',controller.adminlogin)

router.get('/getallreportpost',veryfyToken,controller.getallreportpost)

router.post('/postblock',veryfyToken,controller.postblock)
  
router.post('/postunblock',veryfyToken,controller.postunblock)
     
router.get('/getallreportuser',veryfyToken,controller.getallreportuser)

router.post('/blockuser',veryfyToken,controller.blockuser)

router.post('/unblockuser',veryfyToken,controller.unblockuser)

module.exports = router   