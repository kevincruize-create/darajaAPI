const express = require('express');
const http = require("http");
const cors = require("cors");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
const moment = require("moment");
const stkpush = require('./Functions/STK_push')

const port = process.env.PORT||3001;

const app = express();
app.use(cors());
const server = http.createServer(app);
//https://github.com/alvin-kiveu/Mpesa-Daraja-Api-NODE.JS/blob/master/app.js

async function getAccessToken() {
  const consumer_key = "zMYnc51rNFuT2AG3A26MTiGgoSPf19JWXEGd8u9EI9x06QGv"; // REPLACE IT WITH YOUR CONSUMER KEY
  const consumer_secret = "M1WNjLGKyGxBrkWCh2Mye9mrRCkknnMwn1CJ1AGatxFvB9IBgLjax3KNm5DJr4Sf"; // REPLACE IT WITH YOUR CONSUMER SECRET
  const url =
    "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  const auth =
    "Basic " +
    new Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: auth,
      },
    });
   
    const dataresponse = response.data;
    // console.log(data);
    const accessToken = dataresponse.access_token;
    //console.log(accessToken)
    return accessToken;
  } catch (error) {
    throw error;
  }
}

//stkpush()
//getAccessToken()
const getAccessTokens = getAccessToken()

app.get("/access_token", (req, res) => {
  getAccessToken()
    .then((accessToken) => {
      res.send("😀 Your access token is " + accessToken);
    })
    .catch(console.log);
});
app.post("/get", (req, res) => {
  console.log("STK PUSH CALLBACK KEVIN");
})
app.post("/callback", (req, res) => {
  try {
    const callback = req.body.Body.stkCallback;

    const resultCode = callback.ResultCode;
    const resultDesc = callback.ResultDesc;

    // If payment failed or cancelled
    if (resultCode !== 0) {
      console.log("❌ Payment failed:", resultDesc);
      return res.json({ status: "failed" });
    }

    // Extract metadata
    const metadata = callback.CallbackMetadata.Item;

    const getValue = (name) =>
      metadata.find(item => item.Name === name)?.Value;

    const amount = getValue("Amount");
    const mpesaReceipt = getValue("MpesaReceiptNumber");
    const phoneNumber = getValue("PhoneNumber");
    const transactionDate = getValue("TransactionDate");

    console.log("✅ PAYMENT SUCCESS");
    console.log("Amount:", amount);
    console.log("Phone:", phoneNumber);
    console.log("Receipt:", mpesaReceipt);
    console.log("Date:", transactionDate);

    // Save to DB here
    // Example:
    // payments.create({ amount, phoneNumber, mpesaReceipt })

    res.json({ status: "ok" });

  } catch (error) {
    console.error("Callback error:", error);
    res.status(500).json({ error: "callback error" });
  }
});



stkpush(getAccessTokens, app, axios, moment)


server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
