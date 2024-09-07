require('dotenv').config();
const mongoose = require('mongoose');

const db = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('MongoDB Connection Done');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

module.exports = db;
