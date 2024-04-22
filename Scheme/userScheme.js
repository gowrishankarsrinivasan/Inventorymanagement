const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile:Number,
  age: Number,
});


module.exports = userSchema;