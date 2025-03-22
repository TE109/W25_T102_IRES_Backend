const Company = require('../models/companyModel');


exports.getAllCompanies = async (req, res) =>{
  try{
    
    const getAllComp = await Company.find();

    res
    .status(200)
    .json({ data: getAllComp });

  //Catching any errors 
  } catch (err){
      res
      .status(400)
      .json({ message: err.message });
  }
};

//Creating New companies Request using Post
exports.createNewCompany = async(req,res) =>{

  try{
    const data = req.body;
    const newCompany = await Company.create(data);

    res
    .status(201)
    .json({
      message: `Company created succesfully. Company Id ${newCompany._id}`,
      _id: newCompany._id
    });

  } catch (err){
      res
      .status(400)
      .json({ message: err.message });
  }
};

//Getting an Company using Get
exports.getCompany = async (req, res) =>{
  try {
    const id = req.params.eid;
    const comp = await Company.findById(id);

    if(comp === null) {
      throw Error("Admin not found");
    }
    
    res
    .status(200)
    .json({ data: comp });

  } catch (err) {
      res
      .status (404)
      .json({ message: err.message });
  }
};

//Updating an Company using put
exports.updateCompany = async(req, res) =>{
  try{
    await Company.findByIdAndUpdate(
      req.params.eid, 
      req.body, 
      { new: true, runValidators: true }
    );

    res
    .status(200)
    .json({ message: "Company details updated successfully" });

  } catch(err) {
      res
      .status(400)
      .json({ message: err.message });
  }
       
};

//Deleting an Company using delete
exports.deleteCompany = async(req,res) =>{
  try {
    const id = req.query.eid;
    await Company.findByIdAndDelete(id);

    res
    .status(200)
    .json({              
      message: `Company deleted successfully ${req.query.eid} `
    });
  } catch(err) {
        res
        .status(400)
        .json({ message: err.message });
  }        
};