const app = require("express")();
const path = require("path");
require("dotenv").config();
const cors = require("cors");

const shortid = require("shortid");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

app.use(cors());

// Serving company logo
app.get("/logo.jpg", (req, res) => {
  res.sendFile(path.join(__dirname, "logo.jpg"));
});

app.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const amount = 1;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT || 1337, () => {
  console.log("Backend running at localhost:1337");
});