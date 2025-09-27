const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "foodPartner",
    required: true,
  },
  items: [orderItemSchema], // Array of ordered food items
  totalAmount: {
    type: Number,
    required: true,
  },
  deliveryAddress: {
    street: String,
    city: String,
    pincode: String,
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "ONLINE"],
    default: "COD",
  },
  status: {
    type: String,
    enum: [
      "PLACED",
      "CONFIRMED",
      "PREPARING",
      "OUT_FOR_DELIVERY",
      "DELIVERED",
      "CANCELLED",
    ],
    default: "PLACED",
  },
  createdAt: { type: Date, default: Date.now },
});

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;
