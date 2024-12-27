const express = require('express');
const router = express.Router();
const { db } = require('../server.js'); // Import db from server.js
const { validateProductData } = require('../utils/validation');
const {uploadImage} = require('../utils/imageHandler');
const path = require('path');


// Add a new product
router.post('/add', validateProductData, uploadImage.single('image'), (req, res) => {
    const { name, description, price, artisanId } = req.body;
    const imagePath = req.file ? req.file.path : null;
     
    if (!name || !description || !price || !artisanId) {
        return res.status(400).json({ message: 'Missing required fields for product' });
      }

    const query = 'INSERT INTO products (name, description, price, artisan_id, image_url) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, description, price, artisanId, imagePath], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error adding product' });
        }
        res.status(201).json({ message: 'Product added successfully', productId: results.insertId });
    });
});
// Get all products
router.get('/', (req, res) => {
    const query = 'SELECT * FROM products';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching products' });
        }
        res.status(200).json(results);
    });
});

router.get('/:id', (req, res) => {
    const productId = req.params.id;
    const query = 'SELECT * FROM products WHERE id = ?';
    db.query(query, [productId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching product' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(results[0]);
    });
});

// Update a product
router.put('/:id', validateProductData, uploadImage.single('image'), (req, res) => {
    const productId = req.params.id;
    const { name, description, price } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const updateQuery = 'UPDATE products SET name = ?, description = ?, price = ?, image_url=? WHERE id = ?';
    db.query(updateQuery, [name, description, price, imagePath, productId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error updating product' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully' });
    });
});
// Delete a product
router.delete('/:id', (req, res) => {
    const productId = req.params.id;
    const query = 'DELETE FROM products WHERE id = ?';
    db.query(query, [productId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error deleting product' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    });
});

module.exports = router;
