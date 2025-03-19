const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  
    companyId:{
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId, 
        required: [true, 'Access ID is required.']
    },
    companyName:{
        type: String,
        required: [true, 'Company or Business name is required.']
    },
    companyFloor:{
        type: String,
        
    },
    companyRoom:{
        type: String,
        
    },
    companyPhone:{
        type: String,
        required: [true, 'Company or Business phone number is required.']
    },

});

const company = mongoose.model('Company', companySchema);

module.exports = company;
