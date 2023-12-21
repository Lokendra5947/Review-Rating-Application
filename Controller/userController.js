const { userModel } = require("../Model/userModel")

 const Registration = async(req,res)=>{
const user = await userModel.findOne({Email: req.body.Email})
if (user){
    return res.status(409).send({Success: false,message:"User Already Exsist"}) 
}
let newUser = await userModel.create(req.body)
res.status(201).send({Suucess:true, message:"Registerd Successfully", data:newUser})
    
 }

 const login = async(req,res) =>{
    let {Email, Passward} = req.body
let user = await userModel.findOne({email:Email})
if(!user){return res.status(404).send({success:false, message:"user not registred"})}
if (Passward != user.Passward){ return res.status(409).send({success:false,message:"incorrect passward"})}
res.status(201).send({success:true,message:"login successfully",data:user})
 } 
 module.exports = {Registration,login}