const userModel = require("../models/user.model.js");
const foodPartnerModel = require("../models/partner.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

  const isUserExist = await userModel.findOne({
    email,
  });

  if (isUserExist) {
    return res.status(400).json({
      message: "User already exists. Try new email...",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName,
    email,
    password: hashPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_TOKEN
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    return res.status(400).json({
      message: "Invalid user or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid user or password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_TOKEN
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  res.status(201).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
  });
}

function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(201).json({
    message: "Logged out successfully",
  });
}

async function registerFoodPartner(req, res) {
  const { name, contactName, phone, address, email, password } = req.body;

  const isFoodPartnerExist = await foodPartnerModel.findOne({
    email,
  });

  if (isFoodPartnerExist) {
    return res.status(400).json({
      message: "FoodPartner already exists. Try new email...",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const foodPartner = await foodPartnerModel.create({
    name,
    contactName,
    phone,
    address,
    email,
    password: hashPassword,
  });

  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_TOKEN
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  res.status(201).json({
    message: "FoodPartner registered successfully",
    foodPartner: {
      id: foodPartner._id,
      name: foodPartner.name,
      contactName: foodPartner.contactName,
      phone: foodPartner.phone,
      address: foodPartner.address,
      email: foodPartner.email,
    },
  });
}

async function loginFoodPartner(req, res) {
  const { email, password } = req.body;

  const foodPartner = await foodPartnerModel.findOne({
    email,
  });

  if (!foodPartner) {
    return res.status(400).json({
      message: "Invalid foodPartner or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid foodPartner or password",
    });
  }

  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_TOKEN
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  res.status(201).json({
    message: "FoodPartner logged in successfully",
    foodPartner: {
      id: foodPartner._id,
      name: foodPartner.name,
      contactName: foodPartner.contactName,
      phone: foodPartner.phone,
      address: foodPartner.address,
      email: foodPartner.email,
    },
  });
}

function logoutFoodPartner(req, res) {
  res.clearCookie("token");
  res.status(201).json({
    message: "Logged out successfully",
  });
}

async function checkAuth(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(200).json({ authenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(200).json({ authenticated: false });
    }

    return res.status(200).json({
      authenticated: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(200).json({ authenticated: false });
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
  checkAuth,
};
