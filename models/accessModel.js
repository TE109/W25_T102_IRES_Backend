const mongoose = require('mongoose');

const accessSchema = new mongoose.Schema({
    accessId: {
        type: String,
        required: [true, 'Access ID is required.']
    },
    visitorId: {
        type: String
       
    },
    accessCode: {
        type: String
        
    },
    type: {
        type: String,
        enum: ['visitor', 'delivery', 'admin']
        
    },
    expiresAt: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Access = mongoose.model('Access', accessSchema);

module.exports = Access;
