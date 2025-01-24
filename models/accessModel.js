const mongoose = require('mongoose');

const accessSchema = new mongoose.Schema({
    accessId: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
        required: [true, 'Access ID is required.']
    },
    visitorId: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
       
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

//function to generate an Access Code:
function generateAccessCode() {
    return crypto.randomBytes(6).toString('hex').toUpperCase(); // Generates a 12-character string
}

//Generate access code before saving the record
accessSchema.pre('save', function (next) {
    if (!this.accessCode) {
        this.accessCode = generateAccessCode();
    }
    next();
});

const Access = mongoose.model('Access', accessSchema);

module.exports = Access;
