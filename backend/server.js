require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const mysql = require('mysql');

app.use(express.json());
// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'digital_marketplace',
});
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database');
});

app.get('/', (req, res) => {
    res.send('Digital Marketplace Backend is running!');
});

// Import routes
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
