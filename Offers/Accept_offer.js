const express = require('express');
//const app = express();


const process = (app) => {
app.use(express.json());
//const myID = 38
//const user_ID = 0
//const amount = 0

  const fetchData = async (ID, amount_kes, team_A, team_B, offerer_id, offer_id, room_num) => {
    try {

      const response = await fetch("http://forexapi.atwebpages.com/offers/accept_offers.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          myID:ID,
          amount:amount_kes,
          team_A,
          team_B,
          offerer_id,
          offer_id,
          room: room_num
        }),
      });

      const data = await response.json();

      return data;

    } catch (error) {
      console.error(error);
    }
  };

  app.post("/accept_offer", async (req, res) => {

    const { myID,  amount, team_a, team_b, offerer_ID, offer_ID } = req.body;
        
       if (!myID || !amount || !team_a || !team_b || !offerer_ID || !amount  ) {
            return console.log('missing credentials');
       }

  const ID  = myID.toString();
  const amount_kes = amount.toString();
  const team_A = team_a.toString();
  const team_B = team_b.toString();
  const offerer_id = offerer_ID.toString();
  const offer_id = offer_ID.toString();
  const room_num =300;

    console.log(ID, amount_kes, team_A, team_B, offerer_id, offer_id, room_num)
    
    const data = await fetchData(ID, amount_kes, team_A, team_B, offerer_id, offer_id, room_num);   // call your function

    res.json(data);                   // send to browser

  });


}


module.exports = process;
