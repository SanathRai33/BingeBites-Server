
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


module.exports = {
  userProfile,
};
