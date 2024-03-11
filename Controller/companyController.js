const { companyModel } = require("../Model/Companymodel");
const { reviewModel } = require("../Model/reviewModel");

const path = require("path");
// Creating the company
let createCompany = async (req, res) => {
  // console.log(req.body, req.file);
  let fileLocation = path.join(__dirname,`../${req.file.destination + req.file.filename}`);
  // console.log(fileLocation)
  let oldCompany = await companyModel.findOne({companyNAme: req.body.companyNAme,});
  if (oldCompany) {return res.status(400).send({ sucees: false, message: "already registerd" });}
  // console.log(req.body)
  let newCompany = await companyModel.create({...req.body,Company_logo: fileLocation,});
  res.status(201).send({ success: true, message: "company Created", data: newCompany });};

// Fetching company list
let companylist = async (req, res) => {
  let compnayList = await companyModel.find().sort({ _id: 1 });
  if (compnayList.length == 0) {return res.status(404).send({ success: false, message: "no Company found" });}
  res.status(200).send({success: true,message: "All Company",total_company: compnayList.length,Data: compnayList,});
};

//  fetching single company using params
let singleCompany = async (req, res) => {
  console.log(req.params);
  try {
    let company = await companyModel.findById(req.params.id);
    if (!company) {return res.status(404).send({ success: false, message: "No Company Found" });}
    const allReview = await reviewModel.find({ companyId: req.params.id });
    res.status(200).send({sucees: true,message: "Company Found",data:company,allreveiw: allReview,TotalReveview: allReview.length,});
  } catch (error) {
    // console.log(error);
    res.status(500).send({ success: false, message: "catch data", data: error.message });}
};
const searchCompany = async (req, res) => {
  const { companyNAme, Location, City, Founded } = req.body;

  // by using query params
  // const { companyNAme, Location, City, Founded } = req.query;
  // console.log(req.body)
  // console.log(req.query)

  let obj = {};

  if (companyNAme) {
    obj.companyNAme = companyNAme;
  }
  if (Location) {
    obj.Location = Location;
  }
  if (City) {
    obj.City = City;
  }
  if (Founded) {
    obj.Founded = Founded;
  }
  var search = await companyModel.find(obj);

  if (search.length > 0) {
    return res.status(200).send({sucess: true,message: " company Found",totalCompany: search.length,company: search,});
  }
  res.status(400).send({ sucess: false, message: "NO company Found" });
};
// Deleting the company
const deleteCompany = async (req, res) => {
  //   console.log(req.params.id)
  console.log(req);
  let company = await companyModel.findById(req.params.id);
  if (!company) {
    return res.status(200).send({ success: false, message: "Company doesn't exist" });}
  await companyModel.findByIdAndDelete(req.params.id);
  if (req.userId != company.userId) {
    return res.status(400).send({ success: true, message: "Not Authorized" });
  }
  res.status(200).send({ success: true, message: "company deleted " });
};

module.exports = {createCompany,companylist,singleCompany,searchCompany,deleteCompany,};
