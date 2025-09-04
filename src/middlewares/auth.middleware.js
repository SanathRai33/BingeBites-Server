const foodPartnerModel = require('../models/partner.model.js');
const jwt = require('jsonwebtoken');

async function authFoodPartnerMiddleware(req, res, next) {
    
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Unauthorized token"
        });
    }

    try {
        const decoded = jwt.verify( token, process.env.JWT_TOKEN);

        const foodPartner = await foodPartnerModel.findById(decoded.id);

        req.foodPartner = foodPartner;

        next()
        
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }

}

module.exports = { authFoodPartnerMiddleware }