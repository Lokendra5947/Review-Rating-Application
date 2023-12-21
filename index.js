const express = require('express')
const { userRoutes } = require('./Router/userRouter')
const { companyRoutes } = require('./Router/companyRoutes')
require('./Helper/dbConnection')
let app = express()
app.use(express.json())
PORT = 9000

  app.use('/user',userRoutes)
  app.use('/company',companyRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is Running at ${PORT}`)
})