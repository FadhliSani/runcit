const express = require('express');
const router = express.Router();

const Item = require('../models/item');

// Get all products
router.get('/', (req, res, next) => {
    Item.findAllItems((err, items) => {
        if(err){
            res.json({success: false, msg: "Error extracting items"});
        } else {
            res.send(items);    
        }
    });
});

// Get product by id
router.get('/:id', (req, res, next) => {
    const params = req.params.id;
    Item.findItemById(params, (err, item) => {
        if(err) {
            res.json({success: false, msg: "Error retrieving item"});
        } else {
            res.send(item);
        }
    });
});

// Get product by category
router.get('/categories/:category', (req, res) => {
    const param = req.params.category;
    Item.findAllItemsByCategory(param, (err, item) => {
        if(err) {
            res.json({success: false, msg: "Error retrieving item"});
        } else {
            res.send(item);
        }
    })
});

// #POST new product
router.post('/', (req, res) => {
    var newItem = new Item();
        newItem.name = req.body.name;
        newItem.price = req.body.price;
        newItem.description = req.body.description;
        newItem.date_updated = Date.now();
        newItem.user_id = req.body.user_id;
        newItem.location = req.body.location;
        newItem.region = req.body.region;
        newItem.category = req.body.category;
    
    
    Item.addNewItem(newItem, (err, item) => {
        if(err){
            res.json({success: false, msg: "Error adding new item"});
        } else {
            res.json({success: true, msg: item});    
        }
    });
});

// #PUT update product
router.put('/:id', (req, res) => {
    const id_params = req.params.id;
    var updatedItem = new Item();
        updatedItem.name = req.body.name;
        updatedItem.price = req.body.price;
        updatedItem.description = req.body.description;
        updatedItem.date_updated = Date.now();
        updatedItem.user_id = req.body.user_id;
        updatedItem.location = req.body.location;
        updatedItem.region = req.body.region;
        updatedItem.category = req.body.category;

    Item.updateItem(id_params, updatedItem, (err, item) => {
        if(err){
            res.json({success: false, msg: "Error updating item"});
        } else {
            res.json({success: true, msg: "item updated"});    
        }
    });
});

// #Delete Delete product 
router.delete('/:id', (req, res) => {
    const params = req.params.id;
    Item.deleteItem(params, (err, item) => {
        if(err){
            res.json({success: false, msg: "Error deleting item"});
        } else {
            res.json({success: true, msg: "Item deleted"});    
        }
    });
});

module.exports = router;