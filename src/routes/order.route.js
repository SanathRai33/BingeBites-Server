const express = require('express');
const router = express.Router();
const { authUserMiddleware } = require('../middlewares/auth.middleware.js');
const { placeOrder } = require('../controllers/order.controller.js');

router.post('/', authUserMiddleware, placeOrder);
router.get('/', authUserMiddleware, getOrdersById);

module.exports = router;