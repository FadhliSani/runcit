const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String
    },
    user_id: {
        type: String,
        require: true
    },
    location: {
        type: String
    },
    date_post: {
        type: Date
    },
    category: {
        type: String
    }
});

const Item = module.exports = mongoose.model('Item', itemSchema);