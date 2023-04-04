const express = require("express");
const mongoose = require("mongoose");
const app = express();

const uri =
  "mongodb+srv://kshah:JRcsUUdipLl1MMHX@cluster0.d5zbb.mongodb.net/puffpass?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}
mongoose.set("strictQuery", true);
connect();

const userRouter = require("./routes/users");
const phoneRouter = require("./routes/phone");
const loyaltyRouter = require("./routes/loyalty");
const merchantRouter = require("./routes/merchant");
app.use("/users", userRouter);
app.use("/phone", phoneRouter);
app.use("/loyalty", loyaltyRouter);
app.use("/merchant", merchantRouter);

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
