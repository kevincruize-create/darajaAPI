const express = require('express');
//const app = express();
//app.use(express.json());

const process = (app) => {
app.use(express.json());
//const name = 'Kevin Mukoya'
//const mpesa = 254726270922

//const phone = 254726270922

  const fetchData = async (room_num, ID, type_text) => {
    try {
      const response = await fetch("http://forexapi.atwebpages.com/offers/Update_room.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          room: room_num,
          myID:ID,
          type: type_text
         }),
      });

      const data = await response.json();

      
      const new_data = {room_num, team, ID}

      io.emit("receive_update_notf", new_data);

      return data;

    } catch (error) {
      console.error(error);
    }
  };

  app.post("/Update_room", async (req, res) => {
  
   const { room, myID, type } = req.body;
     if (!room || !myID || !type) {
      return console.log('missing credentials');
     }
    const room_num  = room.toString();
    const ID  = myID.toString();
    const type_text  = type.toString();
    
    const data = await fetchData(room_num, ID, type_text);   // call your function

    res.json(data);                   // send to browser

  });


}


module.exports = process;


