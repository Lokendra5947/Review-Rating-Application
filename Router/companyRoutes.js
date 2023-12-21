const express = require('express')
const { createCompany, companylist } = require('../Controller/companyController')
const companyRoutes = express.Router()

companyRoutes.post('/',createCompany)
companyRoutes.get('/list',companylist)

module.exports = {companyRoutes}