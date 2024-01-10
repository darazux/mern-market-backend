// index.js

const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  return res.status(200).json('hello');
});

// ITEM functions
// Create Item
// Read All Items
// Read Single Item
// Update Item
// Delete Item

// USER functions
// Register User
// Login User

app.listen(PORT, () => {
  console.log(`Listening on localhost port ${PORT}`);
});
