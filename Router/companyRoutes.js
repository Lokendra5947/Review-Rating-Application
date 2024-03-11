const express = require('express')
const { createCompany, companylist, singleCompany, deleteCompany, searchCompany } = require('../Controller/companyController')
const { upload } = require('../Helper/multerStorage')
const verifyToken = require('../MiddleWare/JWTverify')
const companyRoutes = express.Router()

companyRoutes.post('/',upload.single("Company_logo"),createCompany)
companyRoutes.get('/list',companylist)
companyRoutes.get('/singleCompany/:id',singleCompany)    // using params
companyRoutes.delete('/:id',verifyToken,deleteCompany)
companyRoutes.get('/search',searchCompany)

module.exports = {companyRoutes}