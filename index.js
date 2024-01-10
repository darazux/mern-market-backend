// index.js

const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require('dotenv').config();
const connectDB = require('./utils/database');
const { ItemModel } = require('./utils/schemaModels');

// ITEM functions
// Create Item
app.post('/item/create', async (req, res) => {
  try {
    await connectDB();
    console.log(req.body);
    const itemData = req.body;
    await ItemModel.create(itemData);
    return res.status(200).json({ message: 'アイテム作成成功' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'アイテム作成失敗' });
  }
});

// Read All Items
app.get('/', async (req, res) => {
  try {
    await connectDB();
    const allItems = await ItemModel.find();
    return res
      .status(400)
      .json({ message: 'アイテム読み取り成功（オール）', allItems: allItems });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'アイテム読み取り失敗（オール）' });
  }
});

// Read Single Item
app.get('/item/:id', async (req, res) => {
  try {
    await connectDB();
    const id = req.params.id;
    const singleItem = await ItemModel.findById(id);
    return res.status(200).json({
      message: 'アイテム読み取り成功（シングル）',
      singleItem: singleItem,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: 'アイテム読み取り失敗（シングル）' });
  }
});

// Update Item
app.put('/item/update/:id', async (req, res) => {
  try {
    await connectDB();
    const id = req.params.id;
    const updateData = req.body;
    await ItemModel.updateOne({ _id: id }, updateData);
    return res.status(200).json({ message: 'アイテム編集成功' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'アイテム編集失敗' });
  }
});

// Delete Item
app.delete('/item/delete/:id', async (req, res) => {
  try {
    await connectDB();
    const id = req.params.id;
    await ItemModel.deleteOne({ _id: id });
    return res.status(200).json({ message: 'アイテム削除成功' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'アイテム削除失敗' });
  }
});

// USER functions
// Register User
// Login User

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on localhost port ${PORT}`);
});
