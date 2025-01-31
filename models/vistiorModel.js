const mongoose = require('mongoose');

const visitor = new mongoose.Schema({
    
    full_name:{
      type: String,
      required: [true, 'Vistiors full name is required.']
    },
    reason_for_visit: {
        type: String,
        required: [true, 'Reason of visit is required.']
      },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required.']
    },
    appointment_time: {
        type: Date,
        
    }
});

const Visitor = mongoose.model('Visitor', visitor);

module.exports = Visitor;