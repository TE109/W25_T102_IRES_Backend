const Delivery = require('../models/deliveryModel')

//new delivery record
exports.createDelivery = async (req, res) => {
    try {
        const { delivery_company, phonenumber, companyName } = req.body;

        if (!delivery_company || !phonenumber || !companyName) {
            return res.status(400).json({
                message: 'Delivery company, phone number and recipient are required.',
            });
        }

        const newDelivery = await Delivery.create({
            delivery_company,
            phonenumber,
            companyName,
        });

        res.status(201).json({
            message: 'Delivery record created successfully.',
            delivery: newDelivery,
        });
    } catch (error) {
        console.error('Error creating delivery record:', error.message);
        res.status(500).json({
            message: 'Failed to create delivery record.',
            error: error.message,
        });
    }
};

//Display all delivery records
// Get all delivery records
exports.getAllDeliveries = async (req, res) => {
    try {
        const deliveries = await Delivery.find();

        if (deliveries.length === 0) {
            return res.status(404).json({
                message: 'No delivery records found.',
            });
        }

        res.status(200).json({
            message: 'Delivery records retrieved successfully.',
            deliveries,
        });
    } catch (error) {
        console.error('Error fetching delivery records:', error.message);
        res.status(500).json({
            message: 'Failed to fetch delivery records.',
            error: error.message,
        });
    }
};

// Get a delivery record by ID
exports.getDeliveryById = async (req, res) => {
    try {
        const { eid } = req.params;
        const delivery = await Delivery.findById(eid);

        if (!delivery) {
            return res.status(404).json({
                message: 'Delivery record not found.',
            });
        }

        res.status(200).json({
            message: 'Delivery record retrieved successfully.',
            delivery,
        });
    } catch (error) {
        console.error('Error fetching delivery record:', error.message);
        res.status(500).json({
            message: 'Failed to fetch delivery record.',
            error: error.message,
        });
    }
};

// Update a delivery record
exports.updateDelivery = async (req, res) => {
    try {
        const { eid } = req.params;
        const updateData = req.body;

        const updatedDelivery = await Delivery.findByIdAndUpdate(eid, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedDelivery) {
            return res.status(404).json({
                message: 'Delivery record not found.',
            });
        }

        res.status(200).json({
            message: 'Delivery record updated successfully.',
            delivery: updatedDelivery,
        });
    } catch (error) {
        console.error('Error updating delivery record:', error.message);
        res.status(500).json({
            message: 'Failed to update delivery record.',
            error: error.message,
        });
    }
};

// Delete a delivery record
exports.deleteDelivery = async (req, res) => {
    try {
        const { eid } = req.params;
        const deletedDelivery = await Delivery.findByIdAndDelete(eid);

        if (!deletedDelivery) {
            return res.status(404).json({
                message: 'Delivery record not found.',
            });
        }

        res.status(200).json({
            message: 'Delivery record deleted successfully.',
        });
    } catch (error) {
        console.error('Error deleting delivery record:', error.message);
        res.status(500).json({
            message: 'Failed to delete delivery record.',
            error: error.message,
        });
    }
};