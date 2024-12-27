const express = require('express');
const router = express.Router();
const { db } = require('../server.js'); // Import db from server.js

router.post('/create', (req, res) => {
    const { userId, productIds, totalPrice, shippingAddress } = req.body;

    if (!userId || !productIds || productIds.length === 0 || !totalPrice || !shippingAddress) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const orderQuery = 'INSERT INTO orders (user_id, total_price, shipping_address) VALUES (?, ?, ?)';
      db.query(orderQuery, [userId, totalPrice, shippingAddress], (err, results) => {
          if(err) {
              console.error(err);
              return res.status(500).json({message: 'Error creating order'});
          }
      const orderId = results.insertId;
        productIds.forEach(productId => {
              const orderItemQuery = 'INSERT INTO order_items (order_id, product_id) VALUES (?,?)';
              db.query(orderItemQuery, [orderId, productId], (err) =>{
                  if(err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Error saving order items'})
                  }
            });
           });
      res.status(201).json({ message: 'Order created successfully', orderId});
    });
  });

  router.get('/user/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = 'SELECT * FROM orders WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching orders' });
        }
        res.status(200).json(results);
    });
});

module.exports = router;
