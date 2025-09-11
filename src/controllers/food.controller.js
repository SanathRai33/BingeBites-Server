const foodModel = require("../models/food.model.js");
const likeModel = require("../models/like.model.js");
const { uploadFile } = require("../services/storage.service.js");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  const fileUploadResult = await uploadFile(req.file.buffer, uuid());

  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
  });

  res.status(201).json({
    message: "Food created successfully",
    food: foodItem,
  });
}

async function getFoodItems(req, res) {
  const foodItems = await foodModel.find({});

  res.status(200).json({
    message: "Food items fetched successfully",
    foodItems,
  });
}

async function likeFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isLiked = await likeModel.findOne({
    user: req.user._id,
    food: foodId,
  });

  if (isLiked) {
    await likeModel.deleteOne({
      user: req.user._id,
      food: foodId,
    });
    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { likes: -1 },
    });

    return res.status(200).json({
      message: "Food item unliked",
      likes: (await foodModel.findById(foodId)).likes,
    });
  }

  const likedFood = await likeModel.create({
    user: req.user._id,
    food: foodId,
  });

  const foodItem = await foodModel.findByIdAndUpdate(foodId, {
    $inc: { likes: 1 },
  });

  res.status(201).json({
    message: "Food item liked",
    likes: likeFood,
  });
}

async function saveFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isSaved = await saveModel.findOne({
    user: req.user._id,
    food: foodId,
  });

  if (isSaved) {
    await saveModel.deleteOne({
      user: req.user._id,
      food: foodId,
    });

    return res.status(200).json({
      message: "Food item unsaved",
    });
  }

  const savedFood = await saveModel.create({
    user: req.user._id,
    food: foodId,
  });
  res.status(201).json({
    message: "Food item saved",
    savedFood,
  });
}

module.exports = { createFood, getFoodItems, likeFood, saveFood };
