const express = require('express')
const { Registration, login } = require('../Controller/userController')
const { companylist } = require('../Controller/companyController')

const userRoutes = express.Router()

userRoutes.get('/',(req,res)=>{
    res.send("userRoutter")
})

userRoutes.post('/userRegister',Registration)
userRoutes.post('/login',login)
module.exports = {userRoutes}