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

async function getProfile(req, res) {
  const partnerId = req.foodPartner._id;

  try {
    const partner = await partnerModel.findById(partnerId);
    if (!partner) {
      return res.status(404).json({ message: "Partner not found" });
    }
    res.status(200).json({
      name: partner.name,
      image: partner.image,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateProfile(req, res) {
  const partnerId = req.partner._id;
  const { name, image } = req.body;

  try {

    if (!partnerId) {
      return res.status(404).json({ message: "Partner not found" });
    }

    const updatedPartner = await partnerModel.findByIdAndUpdate(
      partnerId,
      { name, image },
      { new: true }
    );

    if (!updatedPartner) {
      return res.status(404).json({ message: "Partner not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      partner: {
        _id: updatedPartner._id,
        name: updatedPartner.name,
        image: updatedPartner.image,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
    getFoodPartnerById,
    getProfile,
    updateProfile
};