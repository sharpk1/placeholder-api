const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
    // res.send(users.json());
  } catch (error) {
    res.sendStatus(500);
    console.log(error.message);
  }
});

router.get("/new", (req, res) => {
  res.send("User New Form");
});

module.exports = router;
