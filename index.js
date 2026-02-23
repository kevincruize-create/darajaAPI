const express = require('express');
const http = require("http");
const cors = require("cors");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
const moment = require("moment");
const stkpush = require('./Functions/STK_push')
const B2C = require('./Functions/B2C')

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
stkpush(getAccessTokens, app, axios, moment)
B2C(getAccessTokens, app, axios, moment)

app.post("/callback", express.json(), async (req, res) => {
  const number = req.query.number;
  const id = req.query.id;
  const amount = req.query.amount;
  console.log(number, id, amount, 'received') //

  try {
    await axios.post(
      "http://forexapi.atwebpages.com/Charges/Deposited.php",
      { number, id, amount },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Failed to send to PHP:", error.message);
  }

  // ⚠️ Always respond OK to Safaricom
  res.status(200).json({
    ResultCode: 0,
    ResultDesc: "Accepted",
  });
});


app.post("/b2c/result", express.json(), async (req, res) => {
    const number = req.query.number;
  const id = req.query.id;
  const amount = req.query.amount;
  console.log(number, id, amount)

  try {
    await axios.post(
      "http://forexapi.atwebpages.com/Charges/Withdraw.php",
      { number, id, amount },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Failed to send to PHP:", error.message);
  }

  // ⚠️ Always respond OK to Safaricom
  res.status(200).json({
    ResultCode: 0,
    ResultDesc: "Accepted",
  });

});


server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
