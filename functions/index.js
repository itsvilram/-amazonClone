const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { request, response } = require("express");
const stripe = require("stripe")(
  "sk_test_51LZ9rPSEhC4BN80BUi2vHCXLyKiZSg5rLIQYCXWFzt2ac5vzIfO4wurbwBbQcNtCi8CVQpzq7xqVblZAFP6YIFKS00SBDfDYpR"
);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// http://localhost:5001/challenge-f6ef6/us-central1/api

app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
   payment_method: 'pm_card_visa',
    amount: total, // subunits of the currency
    currency: "inr",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);
