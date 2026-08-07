const express = require('express');
const stkpush_rocketie = require('./stk_push_rocketie')
const b2c_rocketie = require('./B2C_rocketie')
const moment = require("moment");
//const app = express();


const process = (app, io, axios, getAccessToken_rocketie) => {
app.use(express.json());

  


//stkpush()
//getAccessToken()
//const getAccessTokens_rocketie = getAccessToken_rocketie()
stkpush_rocketie(getAccessToken_rocketie, app, axios, moment)
b2c_rocketie(getAccessToken_rocketie, app, axios, moment)

app.get("/access_token", (req, res) => {
  getAccessToken()
    .then((accessToken) => {
      res.send("😀 Your access token is " + accessToken);
    })
    .catch(console.log);
});

}


module.exports = process;
