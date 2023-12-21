const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{type:String, require:true},
    Email:{type:String, require:true},
    Passward:{type:String, require:true},
    Mobile:{type:String, require:true},
    City:{type:String, require:true},
    State:{type:String, require:true},
})

const userModel = mongoose.model("userModel",userSchema)

module.exports = {userModel}