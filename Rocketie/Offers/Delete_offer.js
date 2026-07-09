const express = require('express');
//const app = express();


const process = (app) => {
app.use(express.json());
//const myID = 38
//const user_ID = 0
//const amount = 0

  const fetchData = async (ID_room) => {
    try {

      const response = await fetch("http://forexapi.atwebpages.com/Rocketie/Offers/delete_my_offers_win.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          room:ID_room,
        
        }),
      });

      const data = await response.json();

      return data;

    } catch (error) {
      console.error(error);
    }
  };

  app.post("/delete_offer_rocketie", async (req, res) => {

    const { room } = req.body;
        if (!room ) {
       return console.log('missing credentials');
       }

  const ID_room  = room.toString();

    
    const data = await fetchData(ID_room);   // call your function

    res.json(data);                   // send to browser

  });


}


module.exports = process;
