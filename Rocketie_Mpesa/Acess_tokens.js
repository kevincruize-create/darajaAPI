const express = require('express');
//const app = express();


const process = (app, io) => {
app.use(express.json());

  
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

}


module.exports = process;
