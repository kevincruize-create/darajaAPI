const express = require('express');
const http = require("http");
const cors = require("cors");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
const moment = require("moment");

const process = (getAccessToken_rocketie, app, axios, moment) => {

  app.use(express.json());

  app.post("/stkpush_rocketie", async (req, res) => {

    try {

      const { myID, amount, mpesa } = req.body;

      if (!myID || !amount || !mpesa) {
        return res.status(400).json({
          success: false,
          message: "Missing credentials"
        });
      }

      const ID = String(myID);
      const amount_kes = String(amount);
      const mpesa_num = String(mpesa);

      console.log("========== STK PUSH ==========");
      console.log("ID:", ID);
      console.log("Amount:", amount_kes);
      console.log("Phone:", mpesa_num);

      // Get access token
      const accessToken = await getAccessToken_rocketie();

      console.log("Access token obtained");

      const timestamp = moment().format("YYYYMMDDHHmmss");

      const password = Buffer.from(
        "4168059" +
        "50630e57477fc855e55e6ce684fd4095606e4a93b52f7b6be5d270f3bac886d2" +
        timestamp
      ).toString("base64");

      const payload = {

        BusinessShortCode: "4168059",

        Password: password,

        Timestamp: timestamp,

        // IMPORTANT
        TransactionType: "CustomerBuyGoodsOnline",

        Amount: Number(amount_kes),

        PartyA: mpesa_num,

        PartyB: "4168059",

        PhoneNumber: mpesa_num,

        CallBackURL:
          `https://darajaapi-2.onrender.com/callback?number=${mpesa_num}&id=${ID}&amount=${amount_kes}`,

        AccountReference: "Rocketie",

        TransactionDesc: "Rocketie deposit"

      };

      console.log("Sending STK request...");
      console.log(payload);

      const response = await axios.post(
        "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }
      );

      console.log("Safaricom response:");
      console.log(response.data);

      return res.status(200).json({
        success: true,
        message: "STK Push sent",
        data: response.data
      });

    } catch (error) {

      console.error("========== STK ERROR ==========");

      console.error(
        error.response?.data || error.message
      );

      return res.status(500).json({
        success: false,
        message: "STK Push failed",
        error: error.response?.data || error.message
      });

    }

  });

};

module.exports = process;
