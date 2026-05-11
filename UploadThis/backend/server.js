const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Adjust this to your frontend URL
}));

require('dotenv').config();

// Replace <username>, <password>, and <dbname> with your Atlas info
const uri = process.env.MONGODB_URI;
 
const path = require('path');

app.use(express.static(path.join(__dirname, '../frontend/public')));
const Product = require('./models/Product');; // Adjust the path as necessary
const Customer = require('./models/Customer'); // Adjust the path as necessary
const Cart = require('./models/Cart'); // Adjust the path as necessary


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Atlas connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Example route
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
  console.log('Open http://localhost:3000/main.html in your browser');
});