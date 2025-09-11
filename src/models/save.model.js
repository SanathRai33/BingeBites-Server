const mongoose = require('mongoose');

const saveSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'food',
    },
},
    { timestamps: true }
);

const saveModel = mongoose.model('save', saveSchema);
module.exports = saveModel;