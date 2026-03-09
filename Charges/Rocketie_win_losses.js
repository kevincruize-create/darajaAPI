const express = require('express');
//const app = express();

const process = (app) => {
app.use(express.json());
//const myID = 38
//const odd = 2.44
//const amount = 30

  const fetchData = async (ID, amount_kes, odd_num) => {
    try {

      const response = await fetch("http://forexapi.atwebpages.com/Charges/Rocketie_win_losses.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          my_id: ID,
          odd: odd_num,
          my_amount:amount_kes
        }),
      });

      const data = await response.json();

      return data;

    } catch (error) {
      console.error(error);
    }
  };

  app.post("/Rocketie_win_losses", async (req, res) => {

      const { my_id, odd, my_amount } = req.body;
      if (!my_id || !my_amount || !odd) {
        if(!my_id) console.log('missing ID');
        if(!my_amount) console.log('missing amount');
        if(!odd) console.log('missing odd');
      
        return 
       }

  const ID  = my_id.toString();
  const amount_kes = my_amount.toString();
  const odd_num = odd.toString();
    
    const data = await fetchData(ID, amount_kes, odd_num);   // call your function

    res.json(data);                   // send to browser

  });


}


module.exports = process;




