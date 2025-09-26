const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      // required: [true, "Phone number is required"],
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
      unique: true,
    },
    address: {
      type: String,
      // required: [true, "Address is required"],
      minlength: [10, "Address must be at least 10 characters long"],
      maxlength: [200, "Address cannot exceed 200 characters"],
      trim: true,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
