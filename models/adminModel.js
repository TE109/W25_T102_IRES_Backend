const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required.']
    },
    resetPassword:{
        type: String,
        
    },
    
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required.']
    }
    

});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
