const foodModel = require('../models/food.model.js');
const { uploadFile } = require('../services/storage.service.js');
const { v4: uuid } = require('uuid')

async function createFood(req, res) {
    
    const fileUploadResult = await uploadFile(req.file.buffer, uuid());

    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    });

    res.status(201).json({
        message: "Food created successfully",
        food: foodItem
    })

}

async function getFoodItems(req, res) {
    const foodItems = await foodModel.find({})

    res.status(200).json({
        message: "Food items fetched successfully",
        foodItems
    })
}

module.exports = { createFood, getFoodItems }