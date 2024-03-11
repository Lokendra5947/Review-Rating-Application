const express = require('express')
const { userRoutes } = require('./Router/userRouter')
const { companyRoutes } = require('./Router/companyRoutes')
const { reviewRoutes } = require('./Router/ReviewRoutes')
require('./Helper/dbConnection')
require("dotenv").config()
let app = express()
// app.use(express.urlencoded({extended:true}))
app.use(express.json())
// PORT = 9000

  app.use('/user',userRoutes)
  app.use('/company',companyRoutes)
  app.use('/review',reviewRoutes)


app.listen(process.env.PORT, ()=>{
    console.log(`Server is Running at ${process.env.PORT}`)
})