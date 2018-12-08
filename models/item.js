const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: "Please enter price number"
    },
    description: {
        type: String
    },
    user_id: {
        type: String,
        require: "Please enter user id"
    },
    location: {
        type: String
    },
    date_created: {
        type: Date
    },
    category: {
        type: String
    }
});

const Item = module.exports = mongoose.model('Item', itemSchema);

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
module.exports.addNewItem = function() {

}

// update item
module.exports.updateItem = function(id, callback) {

}

// delete item
module.exports.deleteItem = function(id, callback) {

}