const express = require('express');
const http = require("http");
const cors = require("cors");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
const moment = require("moment");


const process = (getAccessTokens, app, axios, moment) =>{
app.use(express.json());
app.post("/stkpush", (req, res) => {
  const { myID, amount, mpesa } = req.body;

  if (!myID || !amount || !mpesa) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const phone = mpesa.toString();

  getAccessTokens
    .then((accessToken) => {
      getAccessTokens
      const timestamp = moment().format("YYYYMMDDHHmmss");

      const password = Buffer.from(
        "4168059" +
        "50630e57477fc855e55e6ce684fd4095606e4a93b52f7b6be5d270f3bac886d2" +
        timestamp
      ).toString("base64");

      return axios.post(
        url,
        {
          BusinessShortCode: "4168059",
          Password: password,
          Timestamp: timestamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: amount,
          PartyA: phone,
          PartyB: "4168059",
          PhoneNumber: phone,
          CallBackURL: `https://darajaapi-2.onrender.com/callback?number=${phone}&id=${myID}&amount=${amount}`,
          AccountReference: myID,
          TransactionDesc: "Mpesa Daraja API stk push test",
        },
        {
          headers: { Authorization: auth },
        }
      );
    })
    .then(() => {
      res.send("😀 STK Push sent. Enter M-Pesa PIN.");
    })
    .catch((error) => {
      console.error(error.response?.data || error.message);
      res.status(500).send("❌ Request failed");
    });
});
}

module.exports = process;
