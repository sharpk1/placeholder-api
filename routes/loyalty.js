const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Loyalty = require("../models/Loyalty");

// Define routes for loyalty collection
router.get("/", async (req, res) => {
  try {
    const loyalties = await Loyalty.find();
    res.send(loyalties);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.post("/addLoyalty", async (req, res) => {
  const loyalty = new Loyalty(req.body);
  try {
    await loyalty.save();
    res.status(201).send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.delete("/loyalty/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Loyalty.findByIdAndDelete(id);
    res.send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
