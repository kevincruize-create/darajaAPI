const express = require('express');
//const app = express();


const process = (app) => {
app.use(express.json());
//const myID = 38
//const user_ID = 0
//const amount = 0

  const fetchData = async (ID, amount_kes, room_num) => {
    try {

      const response = await fetch("http://forexapi.atwebpages.com/Rocketie/Offers/place_offer.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          myID:ID,
          amount:amount_kes,
          room: room_num
        }),
      });

      const data = await response.json();

      return data;

    } catch (error) {
      console.error(error);
    }
  };

  app.post("/send_offer_rocketie", async (req, res) => {

    const { myID,  amount } = req.body;
        if (!myID || !amount ) {
       return console.log('missing credentials');
       }

  const ID  = myID.toString();
  const amount_kes = amount.toString();
  const room_num = 300;
    
    const data = await fetchData(ID, amount_kes, room_num);   // call your function

    res.json(data);                   // send to browser

  });


}


module.exports = process;
