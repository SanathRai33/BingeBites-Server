const userModel = require("../models/user.model.js");

async function userProfile(req, res) {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    return res.status(200).json({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
      message: "User profile fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
}

async function updateUserProfile(req, res) {
  try {
    const { fullName, phone, address } = req.body;

    const user = req.user._id;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = req.params.id;

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { fullName, phone, address },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
}

module.exports = {
  userProfile,
  updateUserProfile
};
