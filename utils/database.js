// utils/database.js

const mongoose = require('mongoose');

// Connecting MongoDB
const mongodbUserName = process.env.MONGODB_USERNAME;
const mongodbPassword = process.env.MONGODB_PASSWORD;
const mongodbBaseUrl = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${mongodbUserName}:${mongodbPassword}@${mongodbBaseUrl}`,
    );
    console.log('Success: Connected to MongoDB');
  } catch (error) {
    console.log(error);
    console.error('Failure: Unconnected to MongoDB');
    throw new Error();
  }
};

module.exports = connectDB;
