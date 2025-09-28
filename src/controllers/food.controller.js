const foodModel = require("../models/food.model.js");
const likeModel = require("../models/like.model.js");
const saveModel = require("../models/save.model.js");
const foodPartnerModel = require("../models/partner.model.js");
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
  const partnerId = await foodItems.foodPartner;
  const partnerName = await foodPartnerModel.find(
    { partnerId },
    { name: 1, image: 1, _id: 0 }
  );

  res.status(200).json({
    message: "Food items fetched successfully",
    foodItems,
    partnerName,
  });
}

async function getFoodById(req, res) {
  try {

    const user = req.user;
    const foodId = req.params.id;

    if(!user){
      return res.status(400).json({
        message: "User not found. Login and try again"
      })
    };

    const food = await foodModel.findById(foodId);

    res.status(201).json({
      message: "Food fetched successfully",
      food
    })
  } catch (error) {
    console.error("Error in fetching saved video:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function likeFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isLiked = await likeModel.findOne({
    user: user,
    food: foodId,
  });

  if (isLiked) {
    await likeModel.deleteOne({
      user: user,
      food: foodId,
    });
    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { likes: -1 },
    });

    return res.status(200).json({
      message: "Food item unliked",
      likes: (await foodModel.findById(foodId)).likes,
      status: false,
    });
  }

  const likedFood = await likeModel.create({
    user: user,
    food: foodId,
  });

  const foodItem = await foodModel.findByIdAndUpdate(foodId, {
    $inc: { likes: 1 },
  });

  res.status(201).json({
    message: "Food item liked",
    likes: likedFood,
    totalLikes: foodItem.likes + 1,
    status: true,
  });
}

async function saveFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isSaved = await saveModel.findOne({
    user: user,
    food: foodId,
  });

  if (isSaved) {
    await saveModel.deleteOne({
      user: user,
      food: foodId,
    });

    return res.status(200).json({
      message: "Food item unsaved",
      status: false,
    });
  }

  const savedFood = await saveModel.create({
    user: user,
    food: foodId,
  });
  res.status(201).json({
    message: "Food item saved",
    savedFood,
    status: true,
  });
}

async function getUserLiked(req, res) {
  const user = req.user;

  try {
    const liked = await likeModel.find({ user: user }).populate("food");

    res.status(200).json({
      message: "User liked videos fetched successfully",
      likedVideos: liked.map((item) => item.food),
    });
  } catch (error) {
    console.error("Error in fetching liked videos:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getUserSaved(req, res) {
  const user = req.user;

  try {
    const saved = await saveModel.find({ user: user }).populate("food");

    res.status(200).json({
      message: "User saved video fetched successfully",
      savedVideos: saved.map((item) => item.food),
    });
  } catch (error) {
    console.error("Error in fetching saved video:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createFood,
  getFoodItems,
  getFoodById,
  likeFood,
  saveFood,
  getUserLiked,
  getUserSaved,
};
