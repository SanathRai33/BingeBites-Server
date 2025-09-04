const foodModel = require('../models/food.model.js');

async function createFood(req, res) {
    console.log(req.foodPartner)

    res.send("Successfull")
}

module.exports = { createFood, }