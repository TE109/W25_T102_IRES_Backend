const mongoose = require('mongoose'); //Connect to mongoose
const Access = require('../models/accessModel'); // Access to Access model
const crypto = require('crypto'); // used for generating accessCode
const { query } = require('express'); //query for retriving database 

//function to generate an Access Code automatically:
function generateAccessCode() {
    return crypto.randomBytes(6).toString('hex').toUpperCase(); // Generates a 12-character string
}

//generate access record and save to database

async function createAccess(req, res) {
    try {
        const { type } = req.body;

        // Validate the type input
        const validTypes = ['visitor', 'delivery', 'admin'];
        if(!validTypes.includes(type)) {
            return res.status(400).json({
                message: `Invalid access type. Valid types are: ${validTypes.join(' ,')}`
            });
        }

      
        //generate the access code
        const accessCode = generateAccessCode();

        // Create a new access record
        //accessId and VisitorId are auto generated default:
        const access = new Access({
            type,
            accessCode,
            expiresAt: new Date(Date.now() + 3600 * 1000) // set expires in 1 hour from the current time stamp
        });

        // Save to the database
        const savedAccess = await access.save();

        res.status(201).json({
            message: 'Access record created successfully. ',
            access: savedAccess
        });
        
    } catch (error) {
        console.error('Error creating access:', error.message);
        res.status(500).json({
            message: 'An error occured while creating the access record. ',
            error: error.message
        });
        
    }
}

module.exports = createAccess;


// Access the database to get the record by accessId

async function getAccessRecord(req, res){
    try{
        //Require accessId as parameter to find record
        const { accessId } = req.params;
        const access = await Access.findById(accessId);

        if(!access) {
            return res.status(404).json({
                message: 'Access record not found'
            });
        } 
        
        res.status(200).json({
            message: 'Access record retrieved successfully',
            access
        });

    }catch (error){
        console.error('Error retrieving access record: ', error.message );
        res.status(500).json({
            message: 'An error occured while retrieving the access record.',
            error: error.message
        });
        
    }

}
module.exports = getAccessRecord;

//update access records by accessId

async function updateAccessRecord(req, res) {
    try{
        //Require parameter accessId to find and update
        const { accessId } = req.params;
        const updateData = req.body;

        //Only allow to update to visitorId, type, expriesAt, isActive
        const allowedFields = ['visitorId', 'type', 'expiresAt', 'isActive'];
        const filteredUpdateData = {};
        for(const key of Object.keys(updateData)){
            if(allowedFields.includes(key)){
                filteredUpdateData[key] = updateData[key];
            }
        }

        //Check if any parameter in updateData is valid
        if(Object.keys(filteredUpdateData).length === 0) {
            return res.status(400).json({
                message: 'Your update does not include any valid fiels'
            });
        }

        const updatedAccess = await Access.findByIdAndUpdate(accessId, filteredUpdateData, {
            new: true,
            runValidators: true
        });

        //In the case the accessId is not valid

        if(!updatedAccess){
            return res.status(404).json({
                message: 'Access record not found'
            });
        }

        res.status(200).json({
            message: 'Access record updated successfully.',
            updatedAccess
        });

        
        } catch {
            console.error('Error updating access record:', error.message);
            res.status(500).json({
                message: 'An error occured while updating the access record.',
                error: error.message
            });
        }
    
}

module.exports = updateAccessRecord;

//function to delete access record by accessId
async function  deleteAccessRecord(req, res){
    try{
        const { accessId } = req.params;

        const deletedRecord = await Access.finByIdAndDelete(accessId);

        if (!deletedRecord){
            return res.status(404).json({
                message: 'Access record not found.'

            });
        }

        res.status(200).json({
            message: 'Access record deleted successfully.',
            access: deletedRecord
        });

    } catch(error){
        console.error('Error deleting record: ', error.message);
        res.status(500).json({
            message: 'An error occured while deleting the access record.',
            error: error.message
        });
    }
}

module.exports = deleteAccessRecord;

//display all the access entry records

async function displayAllAccessRecords(req, res){
    try{
        //Attempt to fetch all records from the database
        const accessRecords = await Access.find();
        res.status(200).json({
            message: 'Access reords retrieved sucessfully.',
            accessRecords
        });
        
    } catch (error) {
        console.error('Error fetching access records: ', error.message);
        res.status(500).json({
            message: 'An error occured while fetching access records. ',
            error: error.message
        });
       

    }
}

module.exports = displayAllAccessRecords;
    