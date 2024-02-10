const User = require("../models/User");
const jwt = require('jsonwebtoken')

// Handling Validation Errors

const handleErrors = (err) => {
  const errors = { email: "", password: "" };

  // Unique Email Error
  if (err.code === 11000) {
    return (errors["email"] = "email is already registered");
  }

  // Email and Password Validation Errors
  if (err.message.includes("users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// jwt
const maxAge = 3 * 24 * 60 * 60
const createToken= (id)=> {
  return jwt.sign({ id }, 'Hemants Secret', { expiresIn: maxAge })
}

module.exports.showData = async (req, res) => {
  try {
    let data = await User.find({});
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

module.exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    let data = User({ email, password });
    let result = await data.save();
    const token = createToken(data._id)
    res.cookie('jwt', token, { maxAge: maxAge * 1000 })
    res.json({ user: data._id })
  } catch (err) {
    const error = handleErrors(err);
    res.send({ error });
  }
};

