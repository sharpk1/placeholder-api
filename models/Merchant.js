const mongoose = require("mongoose");

const merchantSchema = new mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deals: [
    {
      _id: mongoose.SchemaTypes.ObjectId,
      name: { type: String, required: true },
      description: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      couponCode: { type: String, required: true },
      isAvailable: { type: Boolean, default: true },
    },
  ],
  campaigns: [
    {
      _id: mongoose.SchemaTypes.ObjectId,
      name: { type: String, required: true },
      description: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      isLive: { type: Boolean, default: false },
      isActive: { type: Boolean, default: false },
      isComplete: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model("Merchant", merchantSchema);
