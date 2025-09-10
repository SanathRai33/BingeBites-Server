const foodPartnerModel = require('../models/partner.model.js');

const getFoodPartnerById = async (req, res) => {
    try {
        const foodPartnerId = req.params.id;
        const foodPartner = await foodPartnerModel.findById(foodPartnerId);
        if (!foodPartner) {
            return res.status(404).json({ message: 'Food partner not found' });
        }
        res.status(200).json({
            message: "Food partner retrieved successfully",
            foodPartner
        });
    } catch (error) {
        console.error('Error fetching food partner by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getFoodPartnerById
};