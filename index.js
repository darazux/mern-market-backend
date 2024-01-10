// index.js

const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require('dotenv').config();
const jwt = require('jsonwebtoken');
const connectDB = require('./utils/database');
const { ItemModel, UserModel } = require('./utils/schemaModels');
const { connect } = require('mongoose');

// ITEM functions
// Create Item
app.post('/item/create', auth, async (req, res) => {
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
app.put('/item/update/:id', auth, async (req, res) => {
  try {
    await connectDB();
    const id = req.params.id;
    const updateData = req.body;
    const singleItem = await ItemModel.findById(id);
    const email = req.body.email;
    if (singleItem.email !== email) {
      throw new Error();
    }
    await ItemModel.updateOne({ _id: id }, updateData);
    return res.status(200).json({ message: 'アイテム編集成功' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'アイテム編集失敗' });
  }
});

// Delete Item
app.delete('/item/delete/:id', auth, async (req, res) => {
  try {
    await connectDB();
    const id = req.params.id;
    const singleItem = await ItemModel.findById(id);
    const email = req.body.email;
    if (singleItem.email !== email) {
      throw new Error();
    }
    await ItemModel.deleteOne({ _id: id });
    return res.status(200).json({ message: 'アイテム削除成功' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'アイテム削除失敗' });
  }
});

// USER functions
// Register User
app.post('/user/register', async (req, res) => {
  try {
    await connectDB();
    const userInfo = req.body;
    await UserModel.create(userInfo);
    return res.status(200).json({ message: 'ユーザー登録成功' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'ユーザー登録失敗' });
  }
});

// Login User
const secret_key = process.env.JWT_SECRET_KEY;

app.post('/user/login', async (req, res) => {
  try {
    await connectDB();
    const email = req.body.email;
    const savedUserInfo = await UserModel.findOne({ email: email });
    if (!savedUserInfo) {
      return res
        .status(400)
        .json({ message: 'ログイン失敗：ユーザー登録をしてください' });
    }
    const password = req.body.password;
    if (password !== savedUserInfo.password) {
      return res
        .status(400)
        .json({ message: 'ログイン失敗：パスワードが間違っています' });
    }
    const payload = {
      email: email,
    };
    const token = jwt.sign(payload, secret_key, { expiresIn: '23h' });
    console.log(token);
    return res.status(200).json({ message: 'ログイン成功', token: token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'ログイン失敗' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on localhost port ${PORT}`);
});
