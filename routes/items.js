const express = require('express');
const router = express.Router();

const Item = require('../models/item');

// Get all products
router.get('/', (req, res, next) => {
    res.send('Get all products');
});

// Get one product
router.get('/:id', (req, res, next) => {
    res.send('Get one product');
});

// Update product

// Delete product 

module.exports = router;