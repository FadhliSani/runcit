const express = require('express');
const router = express.Router();

const Item = require('../models/item');

// Get all products
router.get('/', (req, res, next) => {
    res.send('Get all products');
});

// Get product by id
router.get('/:id', (req, res, next) => {
    res.send('Get one product');
});

// Get product by category
router.get('/categories/:category', (req, res) => {
    const param = req.params.category;
    res.send('Get product by ' +param);
});

// #POST new product
router.post('/:id', (req, res) => {
    res.send('create new product');
});

// #Patch product
router.patch('/:id', (req, res) => {
    res.send('update product')
});

// #Delete Delete product 
router.delete('/:id', (req, res) => {
    res.send('delete product');
});

module.exports = router;