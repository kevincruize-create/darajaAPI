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
    await axios.post(
      "http://rocketietest.getenjoyment.net/Test.php",
      { number, id },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Failed to send to PHP:", error.message);
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
      // 🔹 Fetch from query params
  console.log('HELLO WORLD')
  const number = req.query.number;
  const id = req.query.id;

  console.log("Number:", number);
  console.log("ID:", id);




  res.status(200).json({
    ResultCode: 0,
    ResultDesc: "Accepted",
  });
});



stkpush(getAccessTokens, app, axios, moment)


server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
