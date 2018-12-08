const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    description: String,
    user_id: {
        type: String,
        require: true
    },
    region: String,
    location: String,
    date_created: {
        type: Date,
        default: Date.now
    },
    date_updated: {
        type: Date
    },
    category: {
        type: String
    }
});

const Item = module.exports = mongoose.model('Item', itemSchema, "items");

// Get all items
module.exports.findAllItems = function(callback) {
    Item.find({}, callback);
}

// Get item by id
module.exports.findItemById = function(id, callback) {
    Item.findById(id, callback);
}

// Get items by category
module.exports.findAllItemsByCategory = function(category, callback) {
    const query = {category: category}
    Item.find(query, callback);
}

// Get item by name
module.exports.findItemByName = function(name, callback) {
    const query = {name: name}
    Item.find(query, callback);
}

// add new item
module.exports.addNewItem = function(item, callback) {
    item.save(item, callback);
}

// update item
module.exports.updateItem = function(id, data, callback) {
    const query = {$set: 
        { 
            "name": data.name,
            "price": data.price,
            "description": data.description,
            "user_id": data.user_id,
            "location": data.location,
            "region": data.region,
            "date_updated": data.date_updated,
            "category": data.category
        }}
    Item.findByIdAndUpdate(id, query, callback);
}

// delete item
module.exports.deleteItem = function(id, callback) {
    Item.findByIdAndDelete(id, callback)
}