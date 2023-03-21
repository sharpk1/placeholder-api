require("dotenv").config();
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const express = require("express");
const router = express.Router();

router.get("/get-service-sid", async (req, res) => {
  try {
    client.verify.v2.services
      .create({ friendlyName: "My First Verify Service" })
      .then((service) => {
        res.json(service.sid);
      });
  } catch (error) {
    res.sendStatus(500);
    console.log(error.message);
  }
});

router.get("/login", async (req, res) => {
  console.log(req.query.phone);
  try {
    console.log(req.query.phone);
    client.verify.v2
      .services("VA3b13399f7151cffa3f05157085e52543")
      .verifications.create({ to: `+1${req.query.phone}`, channel: "sms" })
      .then((verification) => res.send(verification));
  } catch (error) {
    res.sendStatus(500);
    console.log(error.message);
  }
});

router.get("/verify", async (req, res) => {
  try {
    // Twilio verification
    client.verify.v2
      .services("VA3b13399f7151cffa3f05157085e52543")
      .verificationChecks.create({
        to: `+1${req.query.phone}`,
        code: req.query.code,
      })
      .then((verification_check) => res.send(verification_check));
  } catch (error) {
    res.sendStatus(500);
    console.log(error.message);
  }
});

module.exports = router;
