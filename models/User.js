const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  isVendor: Boolean,
});

module.exports = mongoose.model("User", userSchema);
