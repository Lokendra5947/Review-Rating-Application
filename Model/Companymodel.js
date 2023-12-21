const { default: mongoose } = require("mongoose");

const companyScehme = new mongoose.Schema({
    companyNAme:{type: String,require:true},
    Location:{type: String,require:true,default:false},
    City:{type: String,require:true},
    Founded:{type: String,require:true},
    isActive:{type: Boolean,default:true},
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"userModel"},
    Company_logo:{type: String},
},{timestamps:true})

let companyModel= new mongoose.model("companyModel",companyScehme)

module.exports = {companyModel}