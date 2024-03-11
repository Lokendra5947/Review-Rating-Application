const { companyModel } = require("../Model/Companymodel");
const { reviewModel } = require("../Model/reviewModel");

const addReview = async (req, res) => {
  let findCompany = companyModel.findOne({ companyId: req.body.companyId });
  if (!findCompany) {
    return res.status(404).send({ success: false, message: "Company not found" });}
  let RivewAdd = await reviewModel.create(req.body);
  // console.log(req.body);
  res.status(201).send({ sucess: true, message: "Review Added", Review: RivewAdd });
};

const reviewUpdate = async (req, res) => {
try { 
    let review = await reviewModel.findOne({ _id: req.params.id });
  console.log("review",review);
  if (req.userId !== review.user_id) {
    return res.status(400).send({ sucess: false, message: "NOt authorized" });
  }
  let updation = await reviewModel.findByIdAndUpdate(req.params.id, req.body, {new:true,});
  if(!updation) {return res.status(400).send({sucess:false,message:"could not update"})}
  res.status(200).send({sucess:true,message:"update Successfully...",data :updation})
}catch(error) {
    console.log(error.message)
}
};

const deleteReview =  async (req, res) => {
  //   console.log(req.params.id)
  console.log(req)
  let Review = await reviewModel.findById(req.params.id)
  if(!Review){return res.status(200).send({success:true,message:"Company doesn't exist"})}
     await companyModel.findByIdAndDelete(req.params.id)
     if(req.userId !== review.user_id){ return res.status(400).send({success:true,message:"Not Authorized"}) }
    res.status(200).send({success:true,message:"company deleted "})
  }
module.exports = { addReview, reviewUpdate,deleteReview };
