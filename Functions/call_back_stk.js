const express = require('express');
//const app = express();

const process = (app) => {

app.post("/callback", express.json(), async (req, res) => {
  const number = req.query.number;
  const id = req.query.id;
  const amount = req.query.amount;
  console.log(number, id, amount, 'received') //

   const send = async()=>{
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
   }

   console.log("STK PUSH CALLBACK RECEIVED");

  const stkCallback = req.body?.Body?.stkCallback;

  if (!stkCallback) {
    console.log("Invalid callback structure");
    return res.sendStatus(400);
  }

  const { CheckoutRequestID, ResultCode, ResultDesc } = stkCallback;

  if (ResultCode === 0) {
    console.log("✅ Payment successful");
    send()
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


}

module.exports = process;
