const orderModel = require("../models/order.model.js");
const partnerModel = require("../models/partner.model.js"); 
const foodModel = require("../models/food.model.js");

const placeOrder = async (req, res) => {
  try {
    const user = req.user;
    const { partner, food } = req.body;

    // Checking user and partner by middleware
    if (!user || !user._id) {
      return res.status(400).json({
        message: "User not authenticated. Cannot place order.",
      });
    }

    if (!partner || !partner._id || !food || !food._id) {
      return res.status(400).json({
        message: "Missing order data.",
      });
    }

        // Checking food and partner by database
    const foundPartner = await partnerModel.findById(partner._id);
    if (!foundPartner) {
      return res.status(404).json({ message: "Partner not found." });
    }

    const foundFood = await foodModel.findById(food._id);
    if (!foundFood) {
      return res.status(404).json({ message: "Food item not found." });
    }

    const orderData = await orderModel.create({
      user: user._id,
      partner: partner._id,
      items: [
        {
          foodId: food._id,
          name: food.name,
          price: food.price,
          quantity: food.quantity,
        },
      ],
      totalAmount: food.price * food.quantity,
      deliveryAddress: user.deliveryAddress || user.address,
      paymentMethod: user.paymentMethod,
    });

    return res.status(201).json({
      message: "Order placed successfully",
      orderData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  placeOrder,
};
