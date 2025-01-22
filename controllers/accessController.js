const mongoose = require('mongoose'); //Connect to mongoose
const Access = require('.models/Access'); // Access to Access model



//generate access code record

async function createAccess(type) {
    try {
        // Validate the type input
        const validTypes = ['visitor', 'delivery', 'admin'];
        if (!validTypes.includes(type)) {
            throw new Error(`Invalid type. Valid types are: ${validTypes.join(', ')}`);
        }

        // Create a new access record
        const access = new Access({
            type: type,
            expiresAt: new Date(Date.now() + 3600 * 1000) // set expires in 1 hour
        });

        // Save to the database
        const savedAccess = await access.save();
        console.log('Access saved:', savedAccess);
        return savedAccess;
    } catch (error) {
        console.error('Error creating access:', error.message);
        throw error;
    }
}

module.exports = createAccess;


//Querry access for database retrieval:

//Update access record

//Delete record

    