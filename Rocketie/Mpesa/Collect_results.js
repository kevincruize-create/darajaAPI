const express = require('express');
//const app = express();
//app.use(express.json());

const process = (app) => {
app.use(express.json());
//const name = 'Kevin Mukoya'
//const mpesa = 254726270922

//const phone = 254726270922

  const fetchData = async (name_data, amount_data, type_data) => {
    try {
      const response = await fetch("http://forexapi.atwebpages.com/Rocketie/Mpesa/Fetch_send_wins_losses.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name_data,
          amount: amount_data,
          type: type_data,
         }),
      });

      const data = await response.json();

      return data;

    } catch (error) {
      console.error(error);
    }
  };

  app.post("/collect_win", async (req, res) => {
  
   const { name, amount, type } = req.body;
     if (!name || !amount || !type) {
      return console.log('missing credentials');
     }

    console.log('credentials detected')
    const name_data  = name.toString();
    const amount_data = amount.toString();
    const type_data = type.toString();
    
    const data = await fetchData(name_data, amount_data, type_data);   // call your function

    res.json(data);                   // send to browser

  });


}


module.exports = process;
