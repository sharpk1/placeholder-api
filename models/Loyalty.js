const mongoose = require("mongoose");

const PunchCardSchema = new mongoose.Schema({
  punchCardId: Number,
  storeName: String,
  storeId: Number,
  punches: Number,
  requiredPunches: Number,
});

const LoyaltySchema = new mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  phoneNumber: String,
  punchCards: [PunchCardSchema],
});

module.exports = mongoose.model("Loyalty", LoyaltySchema);
