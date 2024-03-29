const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const Merchant = require("../models/merchant");
const bodyParser = require("body-parser");

router.use(bodyParser.json());
// Create a new merchant
router.post("/merchants", async (req, res) => {
  try {
    const { email, password, name, address, phone } = req.body;

    const newMerchant = new Merchant({
      _id: mongoose.Types.ObjectId(), // Set the _id field to a new ObjectId
      email,
      password,
      name,
      address,
      phone,
      deals: [], // Set up an empty deals array
      campaigns: [], // Set up an empty campaigns array
      storeHours: {
        Monday: { open: "09:00", close: "17:00" },
        Tuesday: { open: "09:00", close: "17:00" },
        Wednesday: { open: "09:00", close: "17:00" },
        Thursday: { open: "09:00", close: "17:00" },
        Friday: { open: "09:00", close: "17:00" },
        Saturday: { open: "Closed", close: "Closed" },
        Sunday: { open: "Closed", close: "Closed" },
      },
    });

    await newMerchant.save();

    res.status(201).json(newMerchant);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
