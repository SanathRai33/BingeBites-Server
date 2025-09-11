const express = require('express');
const router = express.Router();
const multer = require('multer');
const { authFoodPartnerMiddleware, authUserMiddleware } = require('../middlewares/auth.middleware.js');
const { createFood, getFoodItems, likeFood, saveFood } = require('../controllers/food.controller.js');

const upload = multer({
    storage: multer.memoryStorage(),
})

router.post('/', authFoodPartnerMiddleware, upload.single('video'), createFood)
router.get('/get', authUserMiddleware, getFoodItems)
router.post('/like', authUserMiddleware, likeFood)
router.post('/save', authUserMiddleware, saveFood)

module.exports = router;