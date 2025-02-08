const Visitor = require('../models/visitorModel');

//new visitor record after the access record categorized by "visitor"

exports.createVisitorRecord = async (req, res) => {
    try{
        const{ full_name, reason_for_visit, phoneNumber, appointment_time } = req.body;

        if(!full_name || !reason_for_visit || !phoneNumber) {
            return res.status(400).json({
                message: "Fields are required: reason for visit, fullname and phone number are required",

            });
        }

        const newVisitor = await Visitor.create({
            full_name,
            reason_for_visit,
            phoneNumber,
            appointment_time
        });

        res.status(201).json({
            message: 'Visitor created successfully.',
            visitor: newVisitor,
        });
    } catch(error) {
        console.error('Error creating visitor: ', error.message);
        res.status(500).json({
            message: 'Failed to create visitor.',
            error: error.message,
        });
    }
    
};

//Display all visitors

exports.displayAllVisitors = async (req, res) => {
try{
    const vistors = await Visitor.find();

    if (this.displayAllVisitors.length === 0) {
        return res.status(404).json({
            message: 'No visitors record to be displayed',
        });
    }

    res.status(200).json({
        message: 'Visitor records retrieved successfully.',
        vistors,
    });

} catch(error) {

    console.error('Error fetching visitors:', error.message);
    res.status(500).json({
        message: 'Failed to fetch visitors.',
        error: error.message

    });

    }
};

//Get visitor by ID
exports.getVisitorById = async(req, res) => {
    try {
        const { id } = req.params;
        const visitor = await Visitor.findById(id);

        if(!visitor) {
            return res.status(404).json({
                message: 'Visitor not found'
            });
        }

        res.status(200).json({
            message: 'Visitor retried successfully.',
            visitor,
        });
    } catch (error) {
        console.error('Error fetching visitor: ', error.message);
        res.status(500).json({
            message: 'Failed to fetch visitor.',
            error: error.message,
        });
    }
};

//Update vistor records by ID
exports.updateVisitor = async (req, res) => {
    try {

        const { id } = req.params;
        const updateData = req.body;

        const updateVisitor = await Visitor.findByIdAndDelete(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedVisitor) {
            return res.status(404).json({
                message: 'Visitor not found',
            });
        }

        res.status(200).json({
            message: 'Visitor updated successfully.',
            visitor: updatedVisitor,
        });


    } catch (error) {

        console.error('Error updating visitor: ', error.message);
        res.status(500).json({
            message: 'Failed to update visitor.',
            error: error.message,
        });

    }
};

//Delete the visitor record
exports.deleteVisitor = async (req, res) => {
    try {

        const { id } = req.params;
        const deletedVisitor = await Visitor.findByIdAndDelete(id);

        if(!deletedVisitor) {
            return res.status(404).json({
                message: ' Visitor not found.'
            });
        }

        res.status(200).json({
            message: 'Visitor deleted successfully.',
        });

    } catch(error) {

        console.error('Error deleting visitor', error.message);
        res.status(500).json({
            message: 'Failed to delete visitor.',
            error: error.message,
        })

    }
};