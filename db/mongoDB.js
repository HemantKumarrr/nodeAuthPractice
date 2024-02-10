const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect("mongodb://0.0.0.0:27017/ecom");
};

module.exports = connectDB;
