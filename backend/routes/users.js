const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../server.js'); // Import db from server.js
const { validateRegistration, validateLogin } = require('../utils/validation');
const { sendConfirmationEmail } = require('../utils/email');


router.post('/register', validateRegistration, async (req, res) => {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, hashedPassword], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error registering user' });
        }
        // Generate a JWT token
        const token = jwt.sign({ id: results.insertId, username }, process.env.JWT_SECRET, { expiresIn: '1h' });

         // Send confirmation email
        sendConfirmationEmail(email, username, 'Welcome to the Digital Marketplace!');


        res.status(201).json({ message: 'User registered successfully', token });
    });
});

router.post('/login', validateLogin, async (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'User logged in successfully', token });
  });
});

module.exports = router;
