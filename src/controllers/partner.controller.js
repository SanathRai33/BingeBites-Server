const foodPartnerModel = require('../models/partner.model.js');
const foodModel = require('../models/food.model.js');

const getFoodPartnerById = async (req, res) => {
    try {
        const foodPartnerId = req.params.id;
        const foodPartner = await foodPartnerModel.findById(foodPartnerId);
        const foodItemsByFoodPartner = await foodModel.find({ foodPartner: foodPartnerId });

        if (!foodPartner) {
            return res.status(404).json({ message: 'Food partner not found' });
        }
        res.status(200).json({
            message: "Food partner retrieved successfully",
            foodPartner: {
                ...foodPartner.toObject(),
                foodItems: foodItemsByFoodPartner
            }
        });
    } catch (error) {
        console.error('Error fetching food partner by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getFoodPartnerById
};