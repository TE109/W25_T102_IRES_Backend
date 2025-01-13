const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CFG = require('../config/config');

//Signing up new Admin using post request
exports.signUpAdmin = async  (req, res) =>{
    try {
      const data = req.body;

      if (!data.password)
        throw Error('Please provide password');
        
      data.password = await bcrypt.hash(data.password, 8);
      const newAdmin = await Admin.create(data);

      const token = jwt.sign(
            { id: newAdmin._id }, CFG.SECRET, { expiresIn: '2h' }
      );

      res
      .status(201)
      .json({ message: `Admin created succesfully.`, token: token });
    
    } catch (err) {
        res
        .status(400)
        .json({ message: err.message });
    }
};

//Login in existing Admin using post request
exports.loginAdmin = async(req,res) =>{
  try { 
    const req_email = req.body.email;
    const req_password = req.body.password;
    
    const admin = await Admin.findOne({ 'email': req_email });

    if(!admin)
        throw Error('Invaild Username and password');
    
    if(await bcrypt.compare(req_password, admin.password)) {
      const token = jwt.sign(
        { id: admin._id }, CFG.SECRET, { expiresIn: '2h' }
      );

      res
      .status(200)
      .json({ message: `Login Successful`, token });

    } else {
        throw Error('Invaild Username and password');
    }
  
  } catch (err) {
      res
      .status(400)
      .json({ message: err.message });
  }
};
