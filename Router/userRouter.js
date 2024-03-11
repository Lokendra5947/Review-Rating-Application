const express = require('express')
const { Registration, login, restPassword, forgetPassword } = require('../Controller/userController')
const { upload } = require('../Helper/multerStorage')
const verifyToken = require('../MiddleWare/JWTverify')
const userRoutes = express.Router()

userRoutes.post('/userRegister',upload.single("profilePic"),Registration)
userRoutes.post('/login',login)
userRoutes.post('/resetPassword',verifyToken,restPassword)
userRoutes.post('/forgetPassword',forgetPassword)

module.exports = {userRoutes}