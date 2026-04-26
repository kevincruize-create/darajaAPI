const express = require('express');
const http = require("http");
const cors = require("cors");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
const moment = require("moment");
const stkpush = require('./Functions/STK_push')
const B2C = require('./Functions/B2C')
const path = require('path');
//const fs = require("fs");

const marketer_list = require('./Rocketie_php/Marketer_list')
const create_account = require('./Rocketie_php/Create_account')
const display_editted = require('./Rocketie_php/Display_editted')
const edit_profile = require('./Rocketie_php/Edit_profile')
const get_details = require('./Rocketie_php/Get_details')
const log_in = require('./Rocketie_php/Log_in')
const Google_approve = require('./Rocketie_php/Google_approve')

const balance = require('./Charges/Balance')
const deposited_update = require('./Charges/Deposited_update')
const pay_marketer = require('./Charges/Pay_marketer')
const rocketie_win_loss = require('./Charges/Rocketie_win_losses')
const update_depps = require('./Charges/Update_depp')
const update_withdrawn = require('./Charges/Update_withdrawn')
const update_withdrawn_real = require('./Charges/Update_withdrawn_real')
const withdraw = require('./Charges/Withdraw')

const send_offer = require('./Offers/Send_offer')
const my_offer = require('./Offers/Display_my_offers')
const display_offer = require('./Offers/Display_offer')
const fetch_win = require('./Charges/fetch_win')

const ACL = require('./Functions/ACL')

const call_back_stk = require('./Functions/call_back_stk')

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

app.get("/access_token_2", (req, res) => {
    res.send(getAccessToken())
});
stkpush(getAccessToken, app, axios, moment)
B2C(getAccessToken, app, axios, moment)


app.post("/callback_2", express.json(), async (req, res) => {
   console.log("STK PUSH CALLBACK RECEIVED");

  const stkCallback = req.body?.Body?.stkCallback;

  if (!stkCallback) {
    console.log("Invalid callback structure");
    return res.sendStatus(400);
  }

  const { CheckoutRequestID, ResultCode, ResultDesc } = stkCallback;

  if (ResultCode === 0) {
    console.log("✅ Payment successful");
  } 
  else if (ResultCode === 1032) {
    console.log("❌ User cancelled the STK request");
  } 
  else {
    console.log("⚠️ STK failed:", ResultDesc, "Code:", ResultCode);
  }

  // Save callback to file (optional)
  fs.writeFile(
    "stkcallback.json",
    JSON.stringify(req.body, null, 2),
    "utf8",
    err => {
      if (err) console.log("File write error:", err);
    }
  );

  res.sendStatus(200); // VERY IMPORTANT: always respond 200 to Safaricom

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

// Serve static files
app.use("/ACL", express.static(path.join(__dirname, "ACL", "build")));

// Catch-all for React routing
app.get("/ACL", (req, res) => {
  res.sendFile(path.join(__dirname, "ACL", "build", "index.html"));
});

//call back
call_back_stk(app, fs)
ACL(app, fs)

// log in
marketer_list(app)
create_account(app)
display_editted(app)
edit_profile(app)
get_details(app)
log_in(app)
Google_approve(app)

//charges
balance(app)
deposited_update(app)
pay_marketer(app)
rocketie_win_loss(app)
update_depps(app)
update_withdrawn(app)
update_withdrawn_real(app)
withdraw(app)

//send offer
send_offer(app)
my_offer(app)
display_offer(app)
fetch_win(app)

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
