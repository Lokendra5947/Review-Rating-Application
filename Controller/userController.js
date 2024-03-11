const { userModel } = require("../Model/userModel")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
require("dotenv").config()
const path = require('path')
const validator = require("validator")

const { matchPassward, hashPassword } = require("../Helper/hashPassword")

 const Registration = async(req,res)=>{
    const {Email} = req.body
    if(!validator.isEmail(Email)){return res.status(400).send({sucess:false,message:"email not valid"})}
    let fileLocation = path.join(__dirname, `../${req.file.destination+req.file.filename}`)
    // console.log(fileLocation)
const user = await userModel.findOne({Email:req.body.Email})
// console.log(user)
if (user){return res.status(409).send({Success: false,message:"User Already Exsist"})}
try{
    // Bcrypt the password 
// var hashPassward=await  bcrypt.hash(req.body.Passward,saltRounds)
let hashhedPassword= await hashPassword(req.body.Passward)
// console.log(hashPassward)

// creating new user
let newUser = await userModel.create({...req.body,Passward:hashhedPassword,profilePic:fileLocation})
// console.log(newUser)
res.status(201).send({Suucess:true, message:"Registerd Successfully", data:newUser})
}
catch (error) {
    // Handle the error
    console.error('Error during registration:', error);
  }  
 }

 const login = async(req,res) =>{
    let {Email, Passward} = req.body
let user = await userModel.findOne({Email:Email})
if(!user){return res.status(404).send({success:false, message:"user not registred"})}
// const matchPassward = await bcrypt.compare(Passward,user.Passward)
// console.log(matchPassward)
let matching = await matchPassward(Passward,user.Passward)

if (!matching){ return res.status(409).send({success:false,message:"incorrect passward"})}
var token = jwt.sign({user:user},process.env.JWTSecret,{expiresIn: "1d"})
res.setHeader("token",token)
res.status(201).send({success:true,message:"login successfully",data:user,token:token})
 }
 //restPassword
let restPassword = async(req,res)=>{
    try {
      let user = await userModel.findOne({Email:req.body.Email})
      if(!user){return res.status(400).send({ success:false,message:"Invalid email"}) }
      if(req.body.newPassword != req.body.confirmPassword){return res.status(400).send({ success:false,message:"Password not matched"})}
      let newHashPassword  = await hashPassword(req.body.newPassword);
      let newdataUpdate = new userModel(user)
      newdataUpdate.Passward = newHashPassword;
      newdataUpdate.save();
      res.status(200).send({success:true,message:"Reset password successfully"})
    } catch (error) {
      console.log(error)
      res.status(500).send({success:false,message:"server crashed"})
    } 
  }

  let forgetPassword = async (req, res) => {
    let user = await userModel.findOne({Email:req.body.Email})
    if(!user){return  res.status(400).send({ status: false, message: "Email not found" }); }
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "lokendraSinghr40@gmail.com",
          pass: "kpaa fedt dlkv ",
        },
      });
      let details = {
        from:"lokendraSinghr40@gmail.com",
        to: req.body.email,
        subject: "hello",
        text: "hello its me user!!!!",
      };
      transporter.sendMail(details, async (err) => {
        if (err) {
          res.status(200).send({ status: false, message: err.message });
        } else {
          res.status(200).send({ status: true, message: "Email Send" });
        }
      });
    } catch (error) {
      console.log(error.message);
      res.send({ status: false, message: "server Down" });
    }
  }; 

 module.exports = {Registration,login,restPassword,forgetPassword}
