const express = require('express');
//const app = express();


const process = (app) => {
app.use(express.json());
//const myID = 38
//const user_ID = 0
//const amount = 0

  const fetchData = async (ID, amount_kes, game_id) => {
    try {

      const response = await fetch("http://forexapi.atwebpages.com/Charges/collect_win.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          myID:ID,
          amount:amount_kes,
          game_id
        }),
      });

      const data = await response.json();

      return data;

    } catch (error) {
      console.error(error);
    }
  };

  app.post("/fetch_win", async (req, res) => {

    const { myID,  amount, gameid } = req.body;
        if (!myID || !amount || !gameid ) {
           return console.log('missing credentials');
       }

  const ID  = myID.toString();
  const amount_kes = amount.toString();
  const game_id = gameid.toString();
 
    
    const data = await fetchData(ID, amount_kes, game_id);   // call your function

    res.json(data);                   // send to browser

  });


}


module.exports = process;
