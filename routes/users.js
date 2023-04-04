const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const User = require("../models/User");
const Loyalty = require("../models/Loyalty");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

// get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (error) {
    res.sendStatus(500);
    console.log(error.message);
  }
});

router.get("/new", (req, res) => {
  res.send("User New Form");
});

router.get("/getUserByPhoneNumber", async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
    // res.send(users.json());
  } catch (error) {
    res.sendStatus(500);
    console.log(error.message);
  }
});

router.post("/incrementPunch", async (req, res) => {
  const { phoneNumber, storeId } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const loyalty = await Loyalty.findOne({ phoneNumber });

    if (!loyalty) {
      return res.status(404).json({ message: "Loyalty not found" });
    }

    const punchCardToUpdate = loyalty.punchCards.find((punchCard) => {
      return punchCard.storeId === storeId;
    });

    if (!punchCardToUpdate) {
      return res.status(404).json({ message: "Punch card not found" });
    }

    const date = new Date();
    date.setHours(date.getHours() - 24);

    if (
      punchCardToUpdate.lastPunchDate &&
      punchCardToUpdate.lastPunchDate >= date
    ) {
      return res
        .status(404)
        .json({ message: "Punch card was scanned less than 24 hours ago." });
    }

    if (punchCardToUpdate.punches + 1 >= punchCardToUpdate.requiredPunches) {
      punchCardToUpdate.punches = 1;
    } else {
      punchCardToUpdate.punches = punchCardToUpdate.punches + 1;
    }

    await loyalty.save();
    res.status(200).json({ message: "Punches incremented successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get(
  "/loyalty/:phoneNumber/punchCards/:punchCardId",
  async (req, res) => {
    try {
      const loyalty = await Loyalty.findOne({
        phoneNumber: req.params.phoneNumber,
      });

      if (!loyalty) {
        return res.status(404).json({ message: "Loyalty not found" });
      }

      const punchCard = loyalty.punchCards.find(
        (card) => card.punchCardId === Number(req.params.punchCardId)
      );

      if (!punchCard) {
        return res.status(404).json({ message: "Punch card not found" });
      }

      res.json(punchCard);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.get("/loyalty/getPunchCardByStoreId", async (req, res) => {
  const { phoneNumber, storeId } = req.query;

  try {
    const loyalty = await Loyalty.findOne(
      { phoneNumber: phoneNumber },
      { punchCards: { $elemMatch: { storeId: storeId } } }
    ).exec();

    if (!loyalty) {
      return res.status(404).json({ message: "Loyalty not found" });
    }

    const punchCard = loyalty.punchCards[0];
    return res.status(200).json({ punchCard: punchCard });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
