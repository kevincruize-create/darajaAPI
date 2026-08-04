const express = require('express');
const http = require("http");
const cors = require("cors");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
const moment = require("moment");


const process = (getAccessToken_rocketie, app, axios, moment) =>{
app.use(express.json());
app.post("/stkpush_rocketie", async (req, res) => {
  try {
    const { myID, amount, mpesa } = req.body;

    if (!myID || !amount || !mpesa) {
       return res.status(400).send("Missing credentials");
    }

    const ID = myID.toString();
    const amount_kes = amount.toString();
    const mpesa_num = mpesa.toString();

    // const ID = '77';
    //const amount_kes = '1';
   // const mpesa_num = '254726270922';

    // 🔥 CALL the function and await the Promise
    const accessToken = await getAccessToken_rocketie();

    const url = "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    const auth = "Bearer " + accessToken;
    const timestamp = moment().format("YYYYMMDDHHmmss");

    const password = Buffer.from(
      "4168059" +
      "50630e57477fc855e55e6ce684fd4095606e4a93b52f7b6be5d270f3bac886d2" +
      timestamp
    ).toString("base64");

    await axios.post(
      url,
      {
        BusinessShortCode: "4168059",
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: `${amount_kes}`,
        PartyA: `${mpesa_num}`,
        PartyB: "4168059",
        PhoneNumber: `${mpesa_num}`,
        CallBackURL: `https://darajaapi-2.onrender.com/callback?number=${mpesa_num}&id=${ID}&amount=${amount_kes}`,
        AccountReference: "Rocketie",
        TransactionDesc: "Mpesa Daraja API stk push test",
      },
      {
        headers: { Authorization: auth },
      }
    );

   //  Amount: `${amount_kes}`,
     //   PartyA: `${mpesa_num}`,

    res.send("😀 Request sent. Enter MPESA PIN to complete payment");
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send("❌ STK Push failed");
  }
});
}

module.exports = process;
