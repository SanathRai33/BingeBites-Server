const express = require('express');
const router = express.Router();
const { authUserMiddleware, authFoodPartnerMiddleware } = require('../middlewares/auth.middleware.js');
const { placeOrder, getOrdersById } = require('../controllers/order.controller.js');

router.post('/', authUserMiddleware, placeOrder);
router.get('/', authFoodPartnerMiddleware, getOrdersById);

module.exports = router;