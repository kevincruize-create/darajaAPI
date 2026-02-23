const express = require('express');
const http = require("http");
const cors = require("cors");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
const moment = require("moment");


const process = (getAccessTokens, app, axios, moment) =>{
app.get("/stkpush", (req, res) => {
 const { myID, amount, mpesa } = req.body;

  if (!myID || !amount || !mpesa) {
    return console.log('missing credentials');
  }

  const phone = mpesa.toString();
  getAccessTokens
    .then((accessToken) => {
      const url =
        "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
      const auth = "Bearer " + accessToken;
      const timestamp = moment().format("YYYYMMDDHHmmss");
      const password = new Buffer.from(
        "4168059" +
          "50630e57477fc855e55e6ce684fd4095606e4a93b52f7b6be5d270f3bac886d2" +
          timestamp
      ).toString("base64");

      axios
        .post(
          url,
          {
            BusinessShortCode: "4168059",
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: 1,
            PartyA: '254726270922', //phone number to receive the stk push
            PartyB: "4168059",
            PhoneNumber: '254726270922',
            CallBackURL: `https://darajaapi-2.onrender.com/callback?number=${mpesa}&id=${myID}&amount=${amount}`,//how do we pass number and ID to this url then fetch it from get?
            AccountReference: "Rocketie",
            TransactionDesc: "Mpesa Daraja API stk push test",
          },
          {
            headers: {
              Authorization: auth,
            },
          }
        )
        .then((response) => {
          res.send("😀 Request is successful done ✔✔. Please enter mpesa pin to complete the transaction");
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send("❌ Request failed");
        });
    })
    .catch(console.log);
});
}

module.exports = process;
