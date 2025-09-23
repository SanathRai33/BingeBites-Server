// ...existing code...
const foodPartnerModel = require("../models/partner.model.js");
const foodModel = require("../models/food.model.js");
const { uploadFile } = require('../services/storage.service.js');

const getFoodPartnerById = async (req, res) => {
  try {
    const foodPartnerId = req.params.id;
    const foodPartner = await foodPartnerModel.findById(foodPartnerId);
    const foodItemsByFoodPartner = await foodModel.find({
      foodPartner: foodPartnerId,
    });

    if (!foodPartner) {
      return res.status(404).json({ message: "Food partner not found" });
    }
    res.status(200).json({
      message: "Food partner retrieved successfully",
      foodPartner: {
        ...foodPartner.toObject(),
        foodItems: foodItemsByFoodPartner,
      },
    });
  } catch (error) {
    console.error("Error fetching food partner by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

async function getProfile(req, res) {
  try {
    const partnerId = req.foodPartner._id;
    const partner = await foodPartnerModel.findById(partnerId);
    if (!partner) {
      return res.status(404).json({ message: "Partner not found" });
    }

    const partnerDetail = req.foodPartner;

    res.status(200).json({
      partner: {
        id: partnerDetail._id,
        name: partnerDetail.name,
        image: partnerDetail.image,
        email: partnerDetail.email
      },
      message: "Partner profile fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateProfile(req, res) {
  try {
    const partnerId = req.foodPartner && req.foodPartner._id;
    if (!partnerId) {
      return res.status(404).json({ message: "Partner not found" });
    }

    const { name } = req.body;
    const updateFields = {};
    if (name) updateFields.name = name;

    // If an image was uploaded via multer (memoryStorage)
    if (req.file) {
      try {
        const uploadResult = await uploadFile(req.file.buffer, req.file.originalname, req.file.mimetype);
        // store the image URL returned by ImageKit
        if (uploadResult && uploadResult.url) {
          updateFields.image = uploadResult.url;
          // optionally store uploadResult.fileId if you want to support deletion later
        }
      } catch (uploadErr) {
        console.error("ImageKit upload error:", uploadErr);
        return res.status(500).json({ message: "Error uploading image" });
      }
    }

    const updatedPartner = await foodPartnerModel.findByIdAndUpdate(
      partnerId,
      updateFields,
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
  updateProfile,
};