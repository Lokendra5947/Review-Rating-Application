const { default: mongoose } = require("mongoose");

const companyScehme = new mongoose.Schema({
    companyNAme:{type: String,require:true},
    Location:{type: String,require:true},
    City:{type: String,require:true},
    Founded:{type: String,require:true},
    isActive:{type: Boolean,default:true},
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"userModel"
    },
    Company_logo:{type: String},
},{timestamps:true})

let companyModel= new mongoose.model("companyModel",companyScehme)

module.exports = {companyModel}



// "companyNAme": "Rudra",
//         "Location": "banglore",
//         "City": "banglore",
//         "Founded": "2001",
//         "isActive": true,
//         "userId": "65955ae77ab3afaabbe41003",
//         "Company_logo": "D:\\CodersID JS\\PRACTICE\\20-12-23\\uploads\\1704431326432project.png",
//         "_id": "65978edee7002d5b20eaf264",