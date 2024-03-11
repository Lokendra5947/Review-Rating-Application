const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{type:String, required:true},
    Email:{type:String, required:true},
    Passward:{type:String, required:true},
    Mobile:{type:String, required:true},
    City:{type:String, required:true},
    State:{type:String, required:true},
    profilePic:{type:String}

})

const userModel = mongoose.model("userModel",userSchema)

module.exports = {userModel}