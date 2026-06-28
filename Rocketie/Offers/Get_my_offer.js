const express = require('express');
//const app = express();


const process = (app) => {
app.use(express.json());
//const myID = 38
//const user_ID = 0
//const amount = 0

  const fetchData = async (ID) => {
    try {

      const response = await fetch("http://forexapi.atwebpages.com/Rocketie/Offers/display_my_offers.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          myID:ID,
        
        }),
      });

      const data = await response.json();

      return data;

    } catch (error) {
      console.error(error);
    }
  };

  app.post("/get_my_offer_rocketie", async (req, res) => {

    const { myID } = req.body;
        if (!myID ) {
       return console.log('missing credentials');
       }

  const ID  = myID.toString();

    
    const data = await fetchData(ID);   // call your function

    res.json(data);                   // send to browser

  });


}


module.exports = process;
