const express = require('express');
//const app = express();


const process = (app) => {
app.use(express.json());
//const myID = 38
//const user_ID = 0
//const amount = 0

  const fetchData = async (ID, amount_kes, user_id) => {
    try {

      const response = await fetch("http://forexapi.atwebpages.com/Charges/Pay_markter.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          myID:ID,
          user_ID:user_id,
          amount:amount_kes
        }),
      });

      const data = await response.json();

      return data;

    } catch (error) {
      console.error(error);
    }
  };

  app.post("/Pay_markter", async (req, res) => {

    const { myID, user_ID, amount } = req.body;
        if (!myID || !amount || !user_ID) {
       return console.log('missing credentials');
       }

  const ID  = myID.toString();
  const amount_kes = amount.toString();
  const user_id = user_ID.toString();
    
    const data = await fetchData(ID, amount_kes, user_id);   // call your function

    res.json(data);                   // send to browser

  });


}


module.exports = process;

