const express = require('express');
//const app = express();


const process = (app) => {
app.use(express.json());
//const myID = 38
//const user_ID = 0
//const amount = 0

  const fetchData = async (ID, game_room) => {
    try {

      const response = await fetch("http://forexapi.atwebpages.com/Rocketie/Offers/Check_player_exists.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          myID:ID,
          room: game_room
          }),
      });

      const data = await response.json();

      return data;

    } catch (error) {
      console.error(error);
    }
  };

  app.post("/display_played", async (req, res) => {

    const { myID, room } = req.body;
        if (!myID || !room) {
       return console.log('missing credentials');
       }

  const ID  = myID.toString();
  const game_room  = myID.toString();

    
    const data = await fetchData(ID, game_room);   // call your function

    res.json(data);                   // send to browser

  });


}


module.exports = process;
