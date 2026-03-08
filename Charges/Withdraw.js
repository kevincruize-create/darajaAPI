const express = require('express');
//const app = express();

const process = (app) => {
app.use(express.json());
//const myID = 38
//const number = 254726270922
//const amount = 200


  const fetchData = async (ID, amount_kes, mpesa_num) => {
    try {

      const response = await fetch("http://forexapi.atwebpages.com/Charges/Withdraw.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: ID,
          number: mpesa_num, 
          amount:amount_kes
        }),
      });

      const data = await response.json();

      return data;

    } catch (error) {
      console.error(error);
    }
  };

  app.post("/Withdraw", async (req, res) => {

  const { myID, amount, number } = req.body;
  if (!myID || !amount || !number) {
       return console.log('missing credentials');
  }

  const ID  = myID.toString();
  const amount_kes = amount.toString();
  const mpesa_num = number.toString();
    
    const data = await fetchData(ID, amount_kes, mpesa_num);   // call your function

    res.json(data);                   // send to browser

  });


}


module.exports = process;

