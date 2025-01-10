const mongoose = require('mongoose');

const delivery = new mongoose.Schema({
    
    delivery_company:{
      type: String,
      required: [true, 'Please enter the delivery company you work for. Required.']
    },
    
    phonenumber: {
        type: String,
        required: [true, 'Phone number is required.']
    }
});

const Delivery = mongoose.model('Delivery', delivery);

module.exports = Delivery;