const foodPartnerModel = require("../models/partner.model.js");
const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req, res, next) {
  const partnerToken = req.cookies.partnerToken;

  if (!partnerToken) {
    return res.status(401).json({
      message: "Unauthorized partnerToken",
    });
  }

  try {
    const decoded = jwt.verify(partnerToken, process.env.JWT_TOKEN);

    const foodPartner = await foodPartnerModel.findById(decoded.id);

    if (!foodPartner) {
      return res.status(401).json({ message: "Partner not found" });
    }

    req.foodPartner = foodPartner;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid partnerToken",
    });
  }
}

async function authUserMiddleware(req, res, next) {
  const userToken = req.cookies.userToken;

  if (!userToken) {
    return res.status(401).json({
      message: "Unauthorized userToken",
    });
  }

  try {
    const decoded = jwt.verify(userToken, process.env.JWT_TOKEN);

    const user = await userModel.findById(decoded.id);

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid userToken",
    });
  }
}

module.exports = { authFoodPartnerMiddleware, authUserMiddleware };
