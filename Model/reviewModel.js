const { default: mongoose } = require("mongoose");

const reviewScehma = new mongoose.Schema({
    subject:{type: String,require:true},
    review:{type: String,require:true},
    rating:{type: Number,require:true},
    isActive:{type: Boolean,default:true},
    companyId:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"companyModel"},
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            require:true,
            ref:"userModel"}
},{timestamps:true})

let reviewModel= new mongoose.model("reviewModel",reviewScehma)

module.exports = {reviewModel}
