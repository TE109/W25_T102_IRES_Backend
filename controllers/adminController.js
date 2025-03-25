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

exports.updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid Admin ID format.',
      });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: 'Current password and new password are required.',
      });
    }

    const admin = await Admin.findById(id);

    // Debug: Log the retrieved admin
    console.log('Retrieved admin:', admin);

    if (!admin) {
      return res.status(404).json({
        message: 'Admin account not found. Verify the accessId.',
        accessId,
      });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: 'The password you entered does not match the current password.',
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 8);
    admin.password = hashedPassword;
    await admin.save();

    res.status(200).json({
      message: 'Password has been changed successfully.',
    });
  } catch (error) {
    console.error('Error updating your password:', error.stack);
    res.status(500).json({
      message: 'Failed to update password.',
      error: error.message,
    });
  }
};