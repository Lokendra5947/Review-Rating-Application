const { companyModel } = require("../Model/Companymodel")
const { userModel } = require("../Model/userModel")

let createCompany = async(req,res)=>{

    let oldCompany  =await companyModel.findOne({companyNAme:req.body.companyNAme})
    if(oldCompany){return res.status(400).send({sucees:false,message:"already registerd"})}
    // console.log(req.body)
    let newCompany = await companyModel.create(req.body)
    res.status(201).send({success:true,message:"company Created", data:newCompany})
}
let companylist =async(req,res)=>{
    let compnayList  = await companyModel.find()
    if(compnayList.length ==0){return res.status(404).send({success:false, message:"no Company found"})}
     res.status(200).send({success:true,message:"All Company",total_company:compnayList.length,Data:compnayList})
    }

module.exports = {createCompany,companylist}