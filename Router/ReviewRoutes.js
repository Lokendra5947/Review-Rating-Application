const express = require('express')
const { addReview, reviewUpdate, deleteReview } = require('../Controller/reviewController')
const verifyToken = require('../MiddleWare/JWTverify')

const reviewRoutes = express.Router()
reviewRoutes.get('/',(req,res) =>{
    res.send("review activated")
})
reviewRoutes.post('/addRatting',addReview)
reviewRoutes.post('/rupdate/:id',verifyToken,reviewUpdate)
reviewRoutes.delete('/:id',verifyToken,deleteReview)
module.exports = {reviewRoutes}