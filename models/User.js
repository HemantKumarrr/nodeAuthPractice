const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const connectDB = require("../db/mongoDB");
connectDB();

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    validate: [isEmail, "Please enter a valid email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: [6, "minimum lenght of password is 6 characters"],
  },
});

userSchema.pre("save", async function (next){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("users", userSchema);

module.exports = User;
