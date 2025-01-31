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

//Display all admin users for management

exports.displayAllAdmin = async (req, res) => {
  try {
      const admins = await Admin.find({}, '-password'); // Exclude password
      res.status(200).json({ admins });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


//Update admin data (password update sepearatedly)
exports.updateAdmin = async (req, res) => {
  try {
      const { id } = req.params;
      const updateData = req.body;

      // Update record
      const updatedAdmin = await Admin.findByIdAndUpdate(id, updateData, {
          new: true,
          runValidators: true
      });

      if (!updatedAdmin) {
          return res.status(404).json({
              message: 'Admin account not found.'
          });
      }

      res.status(200).json({
          message: 'Admin account updated successfully.',
          admin: updatedAdmin
      });
  } catch (error) {
      console.error('Error updating admin:', error.message);
      res.status(500).json({
          message: 'Failed to update admin account.',
          error: error.message
      });
  }
};

//Function to update password

exports.updatePassword = async (req, res) => {
  try {
      const { accessId } = req.params;
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
          return res.status(400).json({
              message: 'Current password and new password are required.'
          });
      }

      // Load the admin data
      const admin = await Admin.findById(accessId);

      if (!admin) {
          return res.status(404).json({
              message: 'Admin account not found.'
          });
      }

      // Validate current password by comparing the input with the recorded password
      const isPasswordValid = await bcrypt.compare(currentPassword, admin.password);
      if (!isPasswordValid) {
          return res.status(400).json({
              message: 'The password you entered does not match the current password.'
          });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 8);
      admin.password = hashedPassword;

      // Save the updated admin record
      await admin.save();

      res.status(200).json({
          message: 'Password has been changed successfully.'
      });
  } catch (error) {
      console.error('Error updating your password:', error.message);
      res.status(500).json({
          message: 'Failed to update password.',
          error: error.message
      });
  }
};