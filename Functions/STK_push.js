const express = require('express');
const http = require("http");
const cors = require("cors");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
const moment = require("moment");


const process = (getAccessToken, app, axios, moment) =>{
app.use(express.json());
app.post("/stkpush", async (req, res) => {
  try {
    const { myID, amount, mpesa } = req.body;

    if (!myID || !amount || !mpesa) {
      return res.status(400).send("Missing credentials");
    }

    const ID = myID.toString();
    const amount_kes = amount.toString();
    const mpesa_num = mpesa.toString();

    // 🔥 CALL the function and await the Promise
    const accessToken = await getAccessToken();

    const url = "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    const auth = "Bearer " + accessToken;
    const timestamp = moment().format("YYYYMMDDHHmmss");

    const password = Buffer.from(
      "4405831" +
      "6684d0788f943a2191927b915600ff72aaba3bc149498b4d330684866db9fd42" +
      timestamp
    ).toString("base64");

    await axios.post(
      url,//
      {
        BusinessShortCode: "4405831",
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: `1`,
        PartyA: `254726270922`,
        PartyB: "4405831",
        PhoneNumber: `${mpesa_num}`,
        CallBackURL: `https://darajaapi-2.onrender.com/callback?number=${mpesa_num}&id=${ID}&amount=${amount_kes}`,
        AccountReference: "Rocketie",
        TransactionDesc: "Mpesa Daraja API stk push test",
      },
      {
        headers: { Authorization: auth },
      }
    );

    res.send("😀 Request sent. Enter MPESA PIN to complete payment");
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send("❌ STK Push failed");
  }
});
}

module.exports = process;
