const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getFoodPartnerById, getProfile, updateProfile } = require('../controllers/partner.controller.js');
const { authUserMiddleware } = require('../middlewares/auth.middleware.js');
const { authFoodPartnerMiddleware } = require('../middlewares/auth.middleware.js');

const upload = multer({
  storage: multer.memoryStorage(),
});

router.get('/food-partner/:id', authUserMiddleware, getFoodPartnerById);
router.get('/profile', authFoodPartnerMiddleware, getProfile);
router.put('/profile', authFoodPartnerMiddleware, upload.single('image'), updateProfile);

module.exports = router;