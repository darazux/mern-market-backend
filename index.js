// index.js

const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require('dotenv').config();
const connectDB = require('./utils/database');

app.get('/', (req, res) => {
  return res.status(200).json('hello');
});

// ITEM functions
// Create Item
app.get('/item/create', (req, res) => {
  connectDB();
  console.log(req.body.title);
  return res.status(200).json('hi');
});

// Read All Items
// Read Single Item
// Update Item
// Delete Item

// USER functions
// Register User
// Login User

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on localhost port ${PORT}`);
});
