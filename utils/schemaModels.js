// utils/schemaModels.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  title: String,
  image: String,
  price: String,
  description: String,
  email: String,
});

exports.ItemModel = mongoose.model('Item', ItemSchema);
